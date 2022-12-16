import { useState, useEffect } from 'react';
import useStore from 'store';

const App = () => {
  const [posts, setPosts] = useState<string[]>([]);
  const subreddit = useStore((state) => state.currentSubreddit);
  const setSubreddit = useStore((state) => state.setCurrentSubreddit);

  useEffect(() => {}, []);

  return <div>Test</div>;
};

export default App;
