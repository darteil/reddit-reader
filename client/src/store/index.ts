import create from 'zustand';

interface IStore {
  currentSubreddit: string;

  setCurrentSubreddit: (subreddit: string) => void;
}

const useStore = create<IStore>()((set) => ({
  subscriptions: [],
  currentSubreddit: 'all',

  setCurrentSubreddit: (subreddit) => set(() => ({ currentSubreddit: subreddit })),
}));

export default useStore;
