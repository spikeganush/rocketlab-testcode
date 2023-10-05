import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {User} from '../types/generalTypes';
import {zustandStorage} from './mmkv';

type UserStoreState = {
  user: User | null;
  isLogged: boolean;
  setUser: (name: User) => void;
  setIsLogged: (isLogged: boolean) => void;
  resetUser: () => void;
};

const userStore = (set: any) => ({
  user: null,
  isLogged: false,
  setUser: (user: User) => set({user}),
  setIsLogged: (isLogged: boolean) => set({isLogged}),
  resetUser: () => {
    set({user: null});
    set({isLogged: false});
  },
});

export const useUserStore = create(
  persist<UserStoreState>(userStore, {
    name: 'user-storage',
    storage: createJSONStorage(() => zustandStorage),
  }),
);
