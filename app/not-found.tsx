import { Metadata } from 'next';
import css from './Not-found.module.css';

export const metadata: Metadata = {
  title: 'Not found',
  description: 'The page does not exist',
  openGraph: {
    title: 'Not found',
    description: 'The page does not exist',
    url: `https://08-zustand-gbvzj4fjc-daletskyiv-1433s-projects.vercel.app/not-found`,
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub',
      },
    ],
    type: 'article',
  },
};

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
