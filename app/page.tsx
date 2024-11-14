import CollectionCarousel from 'components/carousel-collection';
import CollectionProducts from 'components/section-carousel';
import SectionEnum from 'components/section-enum';
import WirkstoffFinder from 'components/section-finder';
import SectionIntro from 'components/section-intro';
import SectionNutzen from 'components/section-nutzen';
import SectionReviews from 'components/section-reviews';

import { lazy } from 'react';

export const metadata = {
  description: 'JalaLife Redesign',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  const SectionMainBlog = lazy(() => import('components/section-mainblog'));
  const SectionBioBlog = lazy(() => import('components/section-bioblog'));
  const SectionBlogArticles = lazy(() => import('components/section-blogarticles'));
  const SectionInfo = lazy(() => import('components/section-info'));
  const Footer = lazy(() => import('components/layout/footer'));

  return (
    <>
      <SectionIntro
        heading={
          <>
            Mehr Natur!
            <br />
            Mehr Leben!
          </>
        }
        size={'85vh'}
      />
      <CollectionProducts />
      <WirkstoffFinder />
      <SectionMainBlog />
      <SectionBlogArticles />

      <CollectionCarousel />

      <SectionNutzen />

      <SectionEnum />

      <SectionBioBlog />

      <SectionInfo />
      <SectionReviews />

      <Footer />
    </>
  );
}
