import { User } from '@/types/user';
import type { Note, UserDraft } from '../types/note';
import { nextServer } from './api';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  query?: string;
  page?: number;
  tag?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
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
  });
  return data;
}

export async function createNote(values: UserDraft): Promise<Note> {
  const { data } = await nextServer.post<Note>('/notes', values);
  return data;
}
export async function deleteNote(id: string): Promise<Note> {
  const { data } = await nextServer.delete<Note>(`/notes/${id}`);
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
}

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};
