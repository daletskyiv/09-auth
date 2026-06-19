import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const category = slug?.[0] === 'all' ? undefined : slug?.[0];

  const title = category ? `Notes of ${category}` : `All notes`;
  const description = category
    ? `The all notes of category ${category}`
    : `All notes across all categories`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: category
        ? `https://08-zustand-gbvzj4fjc-daletskyiv-1433s-projects.vercel.app/notes/filter/${category}`
        : `https://08-zustand-gbvzj4fjc-daletskyiv-1433s-projects.vercel.app/notes/filter/all`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt: category ? `Notes of ${category}` : `All notes`,
        },
      ],
      type: 'website',
    },
  };
}

interface PageProps {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ query?: string; page?: string }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const queryClient = new QueryClient();

  const slug = (await params).slug;
  const category = slug?.[0] === 'all' ? undefined : slug?.[0];

  const query = (await searchParams).query ?? '';
  const page = Number((await searchParams).page) || 1;

  const fetchParams = {
    ...(query && { query }),
    ...(page && { page }),
    ...(category && { tag: category }),
  };

  await queryClient.prefetchQuery({
    queryKey: ['notes', fetchParams],
    queryFn: () => fetchNotes(fetchParams),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
