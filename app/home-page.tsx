import Footer from 'components/layout/footer';
import { SectionBlogArticles } from 'components/section-blogarticles';
import { SectionMainBlog } from 'components/section-mainblog';
import dynamic from 'next/dynamic';

export default async function HomePage() {
  const SectionIntro = dynamic(() => import('components/section-intro'), { ssr: false });
  const SectionCarousel = dynamic(() => import('components/section-carousel'), { ssr: false });

  return (
    <>
      <SectionIntro />
      <SectionCarousel />
      <SectionMainBlog />
      <SectionBlogArticles />
      <Footer />
    </>
  );
}
