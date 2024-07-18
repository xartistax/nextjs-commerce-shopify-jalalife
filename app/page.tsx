import SectionCarousel from 'components/section-carousel';
import SectionLast from 'components/section-last';
import dynamic from 'next/dynamic';

export const metadata = {
  description: 'JalaLife Redesign',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  const SectionIntro = dynamic(() => import('components/section-intro'), { ssr: false });
  //const SectionCarousel = dynamic(() => import('components/section-carousel'), { ssr: false })
  const SectionMainBlog = dynamic(() => import('components/section-mainblog'), { ssr: false });
  const SectionBlogArticles = dynamic(() => import('components/section-blogarticles'), {
    ssr: false
  });
  const SectionInfo = dynamic(() => import('components/section-info'), { ssr: false });
  const Footer = dynamic(() => import('components/layout/footer'), { ssr: false });

  return (
    <>
      <SectionIntro />
      <SectionCarousel />
      <SectionMainBlog />
      <SectionBlogArticles />
      <SectionInfo />
      <SectionLast />
      <SectionCarousel />
      <Footer />
    </>
  );
}
