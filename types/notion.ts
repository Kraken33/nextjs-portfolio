export type NotionTextPropertyOptions = '_' | 'b' | 'i' | null;

export type NotionDatabaseText = [string, NotionTextPropertyOptions[]][];

export type NotionTextProperty = {
  title: NotionDatabaseText;
};

export type NotionMultiselectProperty = string[];

export type NotionDatabaseMultiselect = [string];

export type NotionDatabaseDate = [
  [string, [['d', { type: 'date'; start_date: string }]]]
];

export type NotionDatabaseFile = [[string, [['a', string]]]];

export type NotionDatabaseProperty = {
  [key: string]:
    | NotionDatabaseDate
    | NotionDatabaseText
    | NotionDatabaseMultiselect
    | NotionDatabaseFile;
};

export enum NotionDatabaseTypes {
  'multiselect' = 'multi_select',
  'text' = 'text',
  'date' = 'date',
  'title' = 'title',
  'file' = 'file',
}

export type NotionBlockProperties =
  | NotionDatabaseProperty
  | NotionMultiselectProperty
  | NotionTextProperty;

export type NotionBlock<T = NotionBlockProperties> = {
  value: {
    id: string;
    space_id: string;
    parent_id: string;
    properties: T;
  };
};

export type NotionCollectionSchemaBody = {
  name: string;
  type: NotionDatabaseTypes;
};

export type NotionCollectionSchema = {
  [k: string]: NotionCollectionSchemaBody;
};

export type NotionPageResponse<T = NotionBlockProperties> = {
  collection: {
    [k: string]: {
      value: {
        schema: NotionCollectionSchema;
      };
    };
  };
  block: {
    [key: string]: NotionBlock<T>;
  };
};

export type NotionTextSchema = {
  text: string;
  options: NotionTextPropertyOptions[];
}[];
