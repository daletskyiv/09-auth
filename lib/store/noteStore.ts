import { UserDraft } from '@/types/note';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  draft: UserDraft;
  setDraft: (note: UserDraft) => void;
  clearDraft: () => void;
}

const initialUser: UserDraft = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => {
      return {
        draft: initialUser,
        setDraft: (note) => set({ draft: note }),
        clearDraft: () => set({ draft: initialUser }),
      };
    },
    { name: 'userDraft', partialize: (state) => ({ draft: state.draft }) },
  ),
);
