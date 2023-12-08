export type NotionTextProperty = {
  title: [[string]];
};

export type NotionMultiselectProperty = string[];

export type NotionDatabaseDate = [
  string,
  ['d', [{ type: 'date'; start_date: string }]]
];

export type NotionDatabaseProperty = {
  [key: string]: NotionDatabaseDate;
};

export type NotionBlockProperties =
  | NotionDatabaseProperty
  | NotionMultiselectProperty
  | NotionTextProperty;

export type NotionPageResponse = {
  block: {
    [key: string]: {
      value: {
        properties: NotionBlockProperties;
      };
    };
  };
};
