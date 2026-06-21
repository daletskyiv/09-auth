import Image from 'next/image';
import css from './ProfilePage.module.css';
import Link from 'next/link';
import { getMe } from '@/lib/api/serverApi';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'User profile page with all information',
  openGraph: {
    title: 'Profile',
    description: 'User profile page with all information',
    url: `https://09-auth-ten-rouge.vercel.app/profile`,
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

export default async function Profile() {
  const user = await getMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href={'/profile/edit/'} className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar || '/default-avatar.png'}
            alt={user.username || 'User Avatar'}
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Name: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
