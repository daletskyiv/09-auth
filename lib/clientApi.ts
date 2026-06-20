import { User } from '@/types/user';
import type { Note, UserDraft } from '../types/note';
import { nextServer } from './api';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  query?: string;
  page?: number;
  tag?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

type CheckSessionRequest = {
  success: boolean;
};

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

export async function register(data: RegisterRequest) {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
}

export async function login(data: RegisterRequest) {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
}

export async function logout(): Promise<void> {
  await nextServer.post('/auth/logout');
}

export async function checkSession() {
  const { data } = await nextServer.get<CheckSessionRequest>('/auth/session');
  return data;
}

export async function getMe() {
  const { data } = await nextServer.get<User>('/auth/me');
  return data;
}
