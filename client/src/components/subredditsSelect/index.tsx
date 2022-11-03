import styled from 'styled-components';

const StyledSelect = styled.div`
  height: 50px;
  border: 1px solid black;
`;

StyledSelect.displayName = 'Select';

const SubredditsSelect = () => <StyledSelect />;

export default SubredditsSelect;
