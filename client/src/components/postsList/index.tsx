import { getHot } from 'api';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IListItem, ListItem } from './listItem';

const StyledWrap = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
`;
const StyledContainer = styled.div`
  border: 1px solid green;
  height: 100%;
`;

const StyledNextBut = styled.button`
  border: none;
  position: absolute;
  bottom: 0;
  left: 0;
  outline: none;
  text-align: center;
  width: 100%;
  height: 28px;
`;

StyledContainer.displayName = 'PostsList';
StyledWrap.displayName = 'Wrap';
StyledNextBut.displayName = 'NextBut';

const PostsList = () => {
  const [list, setList] = useState<IListItem[]>([]);
  const [currentLastPostId, setCurrentLastPostId] = useState<string>('');

  useEffect(() => {
    getHot('threejs', '').then((data) => {
      if (data) {
        setList(data);
        setCurrentLastPostId(data[data.length - 1].fullname);
      }
    });
  }, []);

  const goNextPage = () => {
    getHot('unixporn', currentLastPostId).then((data) => {
      if (data) {
        setList(data);
        setCurrentLastPostId(data[data.length - 1].fullname);
      }
    });
  };

  return (
    <StyledWrap>
      <StyledContainer className="styled-scroll">
        {list.map((value) => (
          <ListItem
            title={value.title}
            created={value.created}
            thumbnail={value.thumbnail}
            postedBy={value.postedBy}
            upVotes={value.upVotes}
          />
        ))}
      </StyledContainer>
      {/*<StyledNextBut onClick={goNextPage}>Next</StyledNextBut>*/}
    </StyledWrap>
  );
};

export default PostsList;
