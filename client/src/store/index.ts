import create from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';

interface IStore {
  authorized: boolean;
  currentSubreddit: string;
  currentPostText: string;

  setAuthorized: (status: boolean) => void;
  setCurrentSubreddit: (subreddit: string) => void;
  setCurrentPostText: (text: string) => void;
}

const useStore = create<IStore>()(
  devtools(
    subscribeWithSelector(
      persist(
        (set) => ({
          // TODO: authorized set to false
          authorized: true,
          currentSubreddit: 'all',
          currentPostText: '',

          setAuthorized: (status) => set(() => ({ authorized: status })),
          setCurrentSubreddit: (subreddit) => set(() => ({ currentSubreddit: subreddit })),
          setCurrentPostText: (text) => set(() => ({ currentPostText: text })),
        }),
        {
          name: 'app-storage',
          partialize: (state) => ({ authorized: state.authorized }),
        },
      ),
    ),
  ),
);

export default useStore;
