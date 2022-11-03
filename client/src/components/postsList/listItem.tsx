import styled from 'styled-components';

export interface IListItem {
  title: string;
  postedBy: string;
  created: number;
  upVotes: number;
  thumbnail: string;
}

const StyledItem = styled.div`
  border: 1px solid red;
  padding: 8px;
`;

const StyledImg = styled.div<Pick<IListItem, 'thumbnail'>>`
  width: 96px;
  height: 72px;
  border: 1px solid green;
  background-color: green;
  background-image: url(${(props) => props.thumbnail || ''});
  background-size: cover;
`;

const StyledInfo = styled.div`
  h3 {
    color: black;
    margin: 0;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
  }
  p {
    color: black;
    margin: 0;
    font-size: 12px;
  }
  span {
    color: orange;
  }
`;

StyledItem.displayName = 'Item';
StyledImg.displayName = 'Img';
StyledInfo.displayName = 'Info';

export const ListItem = (props: IListItem) => (
  <StyledItem>
    <StyledImg thumbnail={props.thumbnail}></StyledImg>
    <StyledInfo>
      <h3>{props.title}</h3>
      <div>
        <p>
          Postded by: <span>{props.postedBy}</span> {props.created} {props.upVotes}
        </p>
      </div>
    </StyledInfo>
  </StyledItem>
);
