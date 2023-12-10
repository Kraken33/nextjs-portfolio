import { Layout } from '@/components/Layout';
import { ShortInfo } from '@/features/ShortInfo';
import { Navigation } from '@/features/Navigation';
import { SocialNetworks } from '@/features/SocialNetworks';
import { About } from '@/features/About';
import { Experience } from '@/features/Experience';
import { PortfolioData } from '@/types/portfolio';
import { BackgroundLiveGradient } from '@/components/BackgroundLiveGradient';
import {
  getCollection,
  getNotionApi,
  getNotionPage,
  getText,
} from '@/utils/notion';
import { useCallback, useState } from 'react';
import { NavigationSections } from '@/types/navigation';

type PortfolioPageProps = {
  portfolioData: PortfolioData;
};

export default function Portfolio({ portfolioData }: PortfolioPageProps) {
  const [activeNavKey, setNavKey] = useState<NavigationSections>(
    NavigationSections.about
  );
  const { fullName, title, subTitle, description, experience, socials } =
    portfolioData;

  return (
    <>
      <BackgroundLiveGradient />
      <Layout>
        <div className="lg:flex lg:justify-between lg:gap-4">
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
            <ShortInfo fullName={fullName} title={title} subTitle={subTitle} />
            <Navigation activeKey={activeNavKey} />
            <SocialNetworks list={socials} />
          </header>
          <main id="content" className="pt-24 lg:w-1/2 lg:py-24">
            <About
              onEntering={useCallback(
                () => setNavKey(NavigationSections.about),
                []
              )}
              description={description}
            />
            <Experience
              onEntering={useCallback(
                () => setNavKey(NavigationSections.experience),
                []
              )}
              list={experience}
            />
          </main>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const notionApi = getNotionApi();
  const rawNotionPage = await getNotionPage({
    notionApi,
    pageId: '0fbda467e31b44fb84519b993e7fed86',
  });

  const getTextByBlockID = getText(rawNotionPage);
  const getCollectionByCollectionID = getCollection(rawNotionPage);

  return {
    props: {
      portfolioData: {
        fullName: getTextByBlockID('ad53d01c-b61b-4675-9f33-a4d15543cd47'),
        title: getTextByBlockID('9b5ab295-93e2-4513-a0e5-2f77ebbf9770'),
        subTitle: getTextByBlockID('643287e5-ba33-4c07-b236-d0793b833d5b'),
        description: getTextByBlockID('9c493688-c604-4350-9b98-8a23ef9c2cfe'),
        experience: getCollectionByCollectionID(
          'b28c9a40-c9cb-40d5-b5b8-bacc8060a1ee'
        ),
        socials: getCollectionByCollectionID(
          'bc0b9674-be52-4d59-b22d-643b49d3cad9'
        ),
      },
    },
  };
}
