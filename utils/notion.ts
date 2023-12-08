import { NotionAPI } from 'notion-client';

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
