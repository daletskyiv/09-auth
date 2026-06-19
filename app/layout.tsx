import Header from '@/components/Header/Header';
import './globals.css';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { Metadata } from 'next';
import { Roboto } from 'next/font/google';

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}
export const metadata: Metadata = {
  title: 'NoteHub',
  description:
    'Simple and efficient application designed for managing personal notes',
  openGraph: {
    title: 'NoteHub',
    description:
      'Simple and efficient application designed for managing personal notes',
    url: `https://08-zustand-gbvzj4fjc-daletskyiv-1433s-projects.vercel.app/`,
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub',
      },
    ],
    type: 'website',
  },
};

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
