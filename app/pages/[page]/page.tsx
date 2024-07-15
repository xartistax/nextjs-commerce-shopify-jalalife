import type { Metadata } from 'next';

import { Container } from '@mui/material';
import Prose from 'components/prose';
import { getPage } from 'lib/shopify';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params
}: {
  params: { page: string };
}): Promise<Metadata> {
  const page = await getPage(params.page);

  if (!page) return notFound();

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || page.bodySummary,
    openGraph: {
      publishedTime: page.createdAt,
      modifiedTime: page.updatedAt,
      type: 'article'
    }
  };
}

export default async function Page({ params }: { params: { page: string } }) {
  const page = await getPage(params.page);

  if (!page) return notFound();

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative', // Ensure relative positioning for proper layering
          overflow: 'hidden' // Prevent overflow issues
        }}
      >
        <h1 className="mb-8 text-5xl font-bold">{page.title}</h1>
        <Prose className="mb-8" html={page.body as string} />
        <p className="text-sm italic text-customColor">
          {`Dieses Dokument wurde zuletzt am ${new Intl.DateTimeFormat(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }).format(new Date(page.updatedAt))} aktualisiert.`}
        </p>
      </Container>
    </>
  );
}
