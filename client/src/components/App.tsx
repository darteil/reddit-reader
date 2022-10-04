import { useState, useEffect } from 'react';
import { getSubscriptions } from 'api';
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

  useEffect(() => {
    getSubscriptions().then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <Demo>
      {posts.map((post) => (
        <p>{post}</p>
      ))}
    </Demo>
  );
}

export default App;
