import { cookies } from 'next/headers';
import { nextServer } from './api';
import { User } from '@/types/user';
import { Note } from '@/types/note';
import { FetchNotesParams, FetchNotesResponse } from './clientApi';

export const checkSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/auth/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function fetchNotes(
  params: FetchNotesParams,
): Promise<FetchNotesResponse> {
  const { query, page, tag } = params;
  const { data } = await nextServer.get<FetchNotesResponse>('/notes', {
    params: {
      ...(query && { search: query }),
      ...(page && { page }),
      ...(tag && { tag }),
      perPage: 12,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}
