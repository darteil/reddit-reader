import create from 'zustand';

interface IStore {
  authorized: boolean;
  currentSubreddit: string;
  currentPostText: string;

  setAuthorized: (status: boolean) => void;
  setCurrentSubreddit: (subreddit: string) => void;
  setCurrentPostText: (text: string) => void;
}

const useStore = create<IStore>()((set) => ({
  authorized: false,
  currentSubreddit: 'all',
  currentPostText: '',

  setAuthorized: (status) => set(() => ({ authorized: status })),
  setCurrentSubreddit: (subreddit) => set(() => ({ currentSubreddit: subreddit })),
  setCurrentPostText: (text) => set(() => ({ currentPostText: text })),
}));

export default useStore;
