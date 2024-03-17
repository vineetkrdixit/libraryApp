import {create} from 'zustand';

const useLibraryStore = create(set => ({
  seen_Walkthrough: 0,
  userInfo: {},
  setUserInfo: userData => set({userInfo: userData}),
}));
export default useLibraryStore;
