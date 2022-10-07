import { useState, useEffect } from 'react';
import { getSubscriptions } from 'api';
import useStore from 'store';
import styled from 'styled-components';

const Demo = styled.div`
  color: black;
  img {
    display: block;
    max-width: 300px;
    max-height: 300px;
  }
`;

Demo.displayName = 'Demo';

function App() {
  const [posts, setPosts] = useState<string[]>([]);
  const subreddit = useStore((state) => state.currentSubreddit);
  const setSubreddit = useStore((state) => state.setCurrentSubreddit);

  useEffect(() => {
    getSubscriptions().then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <Demo>
      <h1>{subreddit}</h1>
      <button
        onClick={() => {
          setSubreddit('new subreddit');
        }}
      >
        Set sub
      </button>
      {posts.map((post) => (
        <p>{post}</p>
      ))}
    </Demo>
  );
}

export default App;
