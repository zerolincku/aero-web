import { create } from 'zustand';
import type { StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { createCounterSlice } from './slices/counterSlice';
import type { CounterSlice } from './slices/counterSlice';

import { createAuthSlice } from './slices/authSlice';
import type { AuthSlice, User } from './slices/authSlice';

import { createUiSlice } from './slices/uiSlice';
import type { UiSlice, Toast, Theme } from './slices/uiSlice';

export type { User, Toast, Theme };

type AppState = CounterSlice & AuthSlice & UiSlice;

const createStore: StateCreator<AppState, [], [], AppState> = (set, get, api) => ({
  ...createCounterSlice(set, get, api),
  ...createAuthSlice(set, get, api),
  ...createUiSlice(set, get, api),
});

export const useStore = create<AppState>()(
  persist(createStore, {
    name: 'aero-cloud-admin-store',
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({
      currentUser: state.currentUser,
      theme: state.theme,
      themeColor: state.themeColor,
    }),
  }),
);
