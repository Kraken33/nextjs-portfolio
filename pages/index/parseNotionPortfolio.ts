import { NotionBlockProperties, NotionPageResponse } from '@/types/notion';

export type PortfolioData = {
  fullName: string;
  title: string;
  subTitle: string;
  description: string;
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

  return {
    fullName: getText('ad53d01c-b61b-4675-9f33-a4d15543cd47'),
    title: getText('9b5ab295-93e2-4513-a0e5-2f77ebbf9770'),
    subTitle: getText('643287e5-ba33-4c07-b236-d0793b833d5b'),
    description: getText('9c493688-c604-4350-9b98-8a23ef9c2cfe'),
  };
};
