import { Layout } from '@/components/Layout';
import { ShortInfo } from '@/features/ShortInfo';
import { Navigation } from '@/features/Navigation';
import { SocialNetworks } from '@/features/SocialNetworks';
import { About } from '@/features/About';
import { Experience } from '@/features/Experience';
import { getNotionApi, getNotionPage } from '@/utils/notion';
import {
  parseNotionPortfolio,
  PortfolioData,
} from '@/pages/index/parseNotionPortfolio';

type PortfolioPageProps = {
  portfolioData: PortfolioData;
};

export default function Portfolio({
  portfolioData,
  rawNotionPage,
}: PortfolioPageProps) {
  console.log(rawNotionPage, 'rawNotionPage');
  const { fullName, title, subTitle, description } = portfolioData;
  return (
    <Layout>
      <div className="lg:flex lg:justify-between lg:gap-4">
        <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
          <ShortInfo fullName={fullName} title={title} subTitle={subTitle} />
          <Navigation />
          <SocialNetworks />
        </header>
        <main id="content" className="pt-24 lg:w-1/2 lg:py-24">
          <About description={description} />
          <Experience />
        </main>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const notionApi = getNotionApi();
  const rawNotionPage = await getNotionPage({
    notionApi,
    pageId: '0fbda467e31b44fb84519b993e7fed86',
  });
  return {
    props: {
      portfolioData: parseNotionPortfolio({ rawNotionPage }),
      rawNotionPage,
    },
  };
}
