import { Layout } from '@/components/Layout';
import { ShortInfo } from '@/features/ShortInfo';
import { Navigation } from '@/features/Navigation';
import { SocialNetworks } from '@/features/SocialNetworks';
import { About } from '@/features/About';
import { Experience } from '@/features/Experience';

export default function Home() {
  return (
    <Layout>
      <div className="lg:flex lg:justify-between lg:gap-4">
        <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
          <ShortInfo />
          <Navigation />
          <SocialNetworks />
        </header>
        <main id="content" className="pt-24 lg:w-1/2 lg:py-24">
          <About />
          <Experience />
        </main>
      </div>
    </Layout>
  );
}
