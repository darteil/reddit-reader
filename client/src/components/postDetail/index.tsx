import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import useStore from 'store';

const StyledPost = styled.div`
  width: 100%;
  height: 100vh;
  border: 1px solid red;
`;

StyledPost.displayName = 'Post';

const Post = () => {
  const text = useStore((state) => state.currentPostText);
  const setText = useStore((state) => state.setCurrentPostText);
  return <StyledPost>Post</StyledPost>;
};

export default Post;
