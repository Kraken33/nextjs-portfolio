export type NotionTextProperty = {
  title: [[string]];
};

export type NotionMultiselectProperty = string[];

export type NotionDatabaseMultiselect = [string];

export type NotionDatabaseDate = [
  [string, [['d', { type: 'date'; start_date: string }]]]
];

export type NotionDatabaseText = [string];

export type NotionDatabaseProperty = {
  [key: string]:
    | NotionDatabaseDate
    | NotionDatabaseText
    | NotionDatabaseMultiselect;
};

export enum NotionDatabaseTypes {
  'multiselect' = 'multi_select',
  'text' = 'text',
  'date' = 'date',
  'title' = 'title',
}

export type NotionBlockProperties =
  | NotionDatabaseProperty
  | NotionMultiselectProperty
  | NotionTextProperty;

export type NotionPageResponse = {
  collection: {
    [k: string]: {
      value: {
        schema: {
          [k: string]: { name: string; type: NotionDatabaseTypes };
        };
      };
    };
  };
  block: {
    [key: string]: {
      value: {
        parent_id: string;
        properties: NotionBlockProperties;
      };
    };
  };
};
