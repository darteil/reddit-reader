import { useState, useEffect } from 'react';
import { getSubscriptions } from 'api';
import useStore from 'store';
import styled from 'styled-components';

import SubredditsSelect from './subredditsSelect';
import PostsList from './postsList';
import Post from './postDetail';

const StyledContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

const StyledSidebar = styled.div`
  width: 600px;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

StyledContainer.displayName = 'MainContainer';
StyledSidebar.displayName = 'Sidebar';

const App = () => {
  const [posts, setPosts] = useState<string[]>([]);
  const subreddit = useStore((state) => state.currentSubreddit);
  const setSubreddit = useStore((state) => state.setCurrentSubreddit);

  useEffect(() => {
    getSubscriptions().then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <StyledContainer>
      <StyledSidebar>
        <SubredditsSelect />
        <PostsList />
      </StyledSidebar>
      <Post />
    </StyledContainer>
  );
};

export default App;
