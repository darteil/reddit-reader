import create from 'zustand';

interface IStore {
  currentSubreddit: string;
  currentPostText: string;

  setCurrentSubreddit: (subreddit: string) => void;
  setCurrentPostText: (text: string) => void;
}

const useStore = create<IStore>()((set) => ({
  currentSubreddit: 'all',
  currentPostText: '',

  setCurrentSubreddit: (subreddit) => set(() => ({ currentSubreddit: subreddit })),
  setCurrentPostText: (text) => set(() => ({ currentPostText: text })),
}));

export default useStore;
