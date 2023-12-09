import reduce from 'lodash/fp/reduce';
import pipe from 'lodash/fp/pipe';
import entries from 'lodash/fp/entries';
import get from 'lodash/fp/get';

import {
  NotionBlockProperties,
  NotionDatabaseDate,
  NotionDatabaseMultiselect,
  NotionDatabaseText,
  NotionDatabaseTypes,
  NotionPageResponse,
} from '@/types/notion';

export type PortfolioData = {
  fullName: string;
  title: string;
  subTitle: string;
  description: string;
  experience: any;
};

type ParserDatabaseScheme = {
  [k: string]: {
    type: NotionDatabaseTypes;
    name: string;
  };
};

export const parseNotionPortfolio = ({
  rawNotionPage,
}: {
  rawNotionPage: NotionPageResponse;
}): PortfolioData => {
  debugger;
  const getProperties = ({
    blockId,
    rawNotionPage,
  }: {
    blockId: string;
    rawNotionPage: NotionPageResponse;
  }) => rawNotionPage.block[blockId].value.properties;
  const getTextByProperties = ({
    properties,
  }: {
    properties: NotionBlockProperties;
  }) => {
    if ('title' in properties) {
      return properties.title[0][0];
    }

    return '';
  };

  const getText = (
    (rawNotionPage) => (blockId) =>
      getTextByProperties({
        properties: getProperties({
          blockId,
          rawNotionPage,
        }),
      })
  )(rawNotionPage);

  const getDatabaseColumn = ((rawNotionPage) => (blockId: string) => {
    const getDatabaseByProperties = ({
      properties,
      schema,
    }: {
      properties: NotionBlockProperties;
      schema: ParserDatabaseScheme;
    }) => {
      if (typeof properties === 'object') {
        return pipe(
          entries,
          reduce(
            ({ properties, parsedProperties }, [key, schema]) => {
              const textHandler = (property: NotionDatabaseText) => {
                return property?.[0]?.[0] || '';
              };
              const dateHandler = (property: NotionDatabaseDate) => {
                return property[0][1][0][1].start_date;
              };
              const multiselectHandler = (
                property: NotionDatabaseMultiselect
              ) => {
                return property || [];
              };
              if (schema.type === NotionDatabaseTypes.text) {
                parsedProperties[schema.name] = textHandler(properties[key]);
              } else if (schema.type === NotionDatabaseTypes.date) {
                parsedProperties[schema.name] = dateHandler(properties[key]);
              } else if (schema.type === NotionDatabaseTypes.multiselect) {
                parsedProperties[schema.name] = multiselectHandler(
                  properties[key]
                );
              } else if (schema.type === NotionDatabaseTypes.title) {
                parsedProperties[schema.name] = textHandler(properties[key]);
              }

              return { properties, parsedProperties };
            },
            { properties, parsedProperties: {} }
          ),
          get('parsedProperties')
        )(schema);
      }
    };

    const { parent_id } = rawNotionPage.block[blockId].value;
    const { schema } = rawNotionPage.collection[parent_id].value;

    return getDatabaseByProperties({
      properties: getProperties({ blockId, rawNotionPage }),
      schema,
    });
  })(rawNotionPage);

  return {
    fullName: getText('ad53d01c-b61b-4675-9f33-a4d15543cd47'),
    title: getText('9b5ab295-93e2-4513-a0e5-2f77ebbf9770'),
    subTitle: getText('643287e5-ba33-4c07-b236-d0793b833d5b'),
    description: getText('9c493688-c604-4350-9b98-8a23ef9c2cfe'),
    experience: [getDatabaseColumn('61241808-8b47-4822-ad45-57bcd2dd46c1')],
  };
};
