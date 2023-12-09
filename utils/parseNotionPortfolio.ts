import reduce from 'lodash/fp/reduce';
import pipe from 'lodash/fp/pipe';
import entries from 'lodash/fp/entries';
import get from 'lodash/fp/get';

import {
  NotionBlockProperties,
  NotionDatabaseDate,
  NotionDatabaseMultiselect,
  NotionDatabaseProperty,
  NotionDatabaseText,
  NotionDatabaseTypes,
  NotionPageResponse,
} from '@/types/notion';

export type ParsedDatabase = {
  [k: string]:
    | NotionDatabaseMultiselect
    | NotionDatabaseDate
    | NotionDatabaseText;
};

export type PortfolioData = {
  fullName: string;
  title: string;
  subTitle: string;
  description: string;
  experience: any;
  socials: any;
};

type ParserSchemaBody = {
  type: NotionDatabaseTypes;
  name: string;
};

type ParserDatabaseScheme = {
  [k: string]: ParserSchemaBody;
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
    (rawNotionPage) => (blockId: string) =>
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
      properties: NotionDatabaseProperty;
      schema: ParserDatabaseScheme;
    }) => {
      if (typeof properties === 'object') {
        return pipe(
          entries,
          reduce<
            [string, ParserSchemaBody],
            {
              properties: NotionDatabaseProperty;
              parsedProperties: Record<string, string | string[]>;
            }
          >(
            (
              {
                properties,
                parsedProperties,
              }: {
                properties: NotionDatabaseProperty;
                parsedProperties: Record<string, string | string[]>;
              },
              [key, schema]
            ) => {
              const textHandler = (property: NotionDatabaseText) => {
                return property?.[0]?.[0] || '';
              };
              const dateHandler = (property: NotionDatabaseDate) => {
                return property[0][1][0][1].start_date;
              };
              const multiselectHandler = (
                property: NotionDatabaseMultiselect
              ) => {
                return property?.[0][0].split(',') || [];
              };
              if (schema.type === NotionDatabaseTypes.text) {
                parsedProperties[schema.name] = textHandler(
                  properties[key] as NotionDatabaseText
                );
              } else if (schema.type === NotionDatabaseTypes.date) {
                parsedProperties[schema.name] = dateHandler(
                  properties[key] as NotionDatabaseDate
                );
              } else if (schema.type === NotionDatabaseTypes.multiselect) {
                parsedProperties[schema.name] = multiselectHandler(
                  properties[key] as NotionDatabaseMultiselect
                );
              } else if (schema.type === NotionDatabaseTypes.title) {
                parsedProperties[schema.name] = textHandler(
                  properties[key] as NotionDatabaseText
                );
              }

              return { properties, parsedProperties };
            },
            {
              properties,
              parsedProperties: {},
            }
          ),
          get('parsedProperties')
        )(schema);
      }
    };

    const { parent_id } = rawNotionPage.block[blockId].value;
    const { schema } = rawNotionPage.collection[parent_id].value;

    return getDatabaseByProperties({
      properties: getProperties({ blockId, rawNotionPage }) as any,
      schema,
    });
  })(rawNotionPage);

  return {
    fullName: getText('ad53d01c-b61b-4675-9f33-a4d15543cd47'),
    title: getText('9b5ab295-93e2-4513-a0e5-2f77ebbf9770'),
    subTitle: getText('643287e5-ba33-4c07-b236-d0793b833d5b'),
    description: getText('9c493688-c604-4350-9b98-8a23ef9c2cfe'),
    experience: [
      getDatabaseColumn('81a81a78-2354-458b-be56-9368a9a4f80c'),
      getDatabaseColumn('61241808-8b47-4822-ad45-57bcd2dd46c1'),
      getDatabaseColumn('0f1e8116-2c84-40eb-bbb7-5677e45c0d22'),
      getDatabaseColumn('55c3697e-0107-48d7-bf24-fcf503744401'),
      getDatabaseColumn('0013ab0a-cbb4-43f2-bc11-177ac5dbc904'),
    ],
    socials: [
      getDatabaseColumn('c84852d1-a679-4fd2-9e23-35cfede50835'),
      getDatabaseColumn('eda4389b-52ab-436b-9195-4b4652e41e68'),
      getDatabaseColumn('b95bdfa7-2490-4f3e-b5c8-486b0d08b0f7'),
    ],
  };
};
