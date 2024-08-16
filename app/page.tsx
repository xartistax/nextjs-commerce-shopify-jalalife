import CollectionProducts from 'components/section-carousel';
import SectionEnum from 'components/section-enum';
import SectionNutzen from 'components/section-nutzen';

import { lazy } from 'react';

export const metadata = {
  description: 'JalaLife Redesign',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  const SectionIntro = lazy(() => import('components/section-intro'));
  // const SectionCarousel = lazy(() => import('components/section-carousel'))
  const SectionMainBlog = lazy(() => import('components/section-mainblog'));
  const SectionBlogArticles = lazy(() => import('components/section-blogarticles'));
  const SectionInfo = lazy(() => import('components/section-info'));
  const Footer = lazy(() => import('components/layout/footer'));

  return (
    <>
      <SectionIntro />
      <CollectionProducts />
      <SectionMainBlog />
      <SectionBlogArticles />
      <SectionInfo />
      <SectionEnum />
      <SectionNutzen />
      <Footer />
    </>
  );
}
