import { NotionAPI } from 'notion-client';
import {
  NotionBlock,
  NotionBlockProperties,
  NotionCollectionSchema,
  NotionCollectionSchemaBody,
  NotionDatabaseDate,
  NotionDatabaseMultiselect,
  NotionDatabaseProperty,
  NotionDatabaseText,
  NotionDatabaseTypes,
  NotionPageResponse,
} from '@/types/notion';
import pipe from 'lodash/fp/pipe';
import entries from 'lodash/fp/entries';
import reduce from 'lodash/fp/reduce';
import get from 'lodash/fp/get';

export const getNotionApi = () => {
  return new NotionAPI();
};

type NotionApiProps = {
  getPage: (id: string) => any;
};

export const getNotionPage = async ({
  pageId,
  notionApi,
}: {
  pageId: string;
  notionApi: NotionApiProps;
}) => {
  return await notionApi.getPage(pageId);
};

// export type ParsedDatabase = {
//   [k: string]:
//     | NotionDatabaseMultiselect
//     | NotionDatabaseDate
//     | NotionDatabaseText;
// };

export const getProperties = ({
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

export const getText =
  (rawNotionPage: NotionPageResponse) => (blockId: string) =>
    getTextByProperties({
      properties: getProperties({
        blockId,
        rawNotionPage,
      }),
    });

export const getCollection =
  (rawNotionPage: NotionPageResponse) => (collectionId: string) => {
    const getDatabaseByProperties = ({
      properties,
      schema,
    }: {
      properties: NotionDatabaseProperty;
      schema: NotionCollectionSchema;
    }) => {
      if (typeof properties === 'object') {
        return pipe(
          entries,
          reduce<
            [string, NotionCollectionSchemaBody],
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

    return pipe(
      entries,
      reduce<[string, NotionBlock], NotionDatabaseProperty[]>(
        (acc, [blockId, properties]) => {
          if (properties.value.parent_id === collectionId) {
            (acc as NotionDatabaseProperty[]).push(
              getDatabaseByProperties({
                properties: getProperties({
                  blockId,
                  rawNotionPage,
                }) as NotionDatabaseProperty,
                schema: rawNotionPage.collection[collectionId].value.schema,
              })
            );
          }

          return acc;
        },
        []
      )
    )(rawNotionPage.block);
  };
