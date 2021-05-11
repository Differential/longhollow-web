import { MagnifyingGlass } from 'phosphor-react';
import {
  connectCurrentRefinements,
  connectSearchBox,
} from 'react-instantsearch-dom';
import { useTheme } from 'styled-components';
import Styled from './Search.styles';

const SearchBox = ({ currentRefinement, isSearchStalled, refine, items }) => {
  const theme = useTheme();
  return (
    <Styled.SearchForm noValidate action="" role="search">
      <Styled.SearchBox
        type="search"
        placeholder="Search"
        value={currentRefinement}
        onChange={event => refine(event.currentTarget.value)}
      />
      <Styled.SearchIcon>
        <MagnifyingGlass color={theme.colors.fg} size="32" />
      </Styled.SearchIcon>
      <Styled.ClearButtonContainer
        onClick={() => {
          refine('');
        }}
      >
        <ConnectedClearAllRefinements />
      </Styled.ClearButtonContainer>
    </Styled.SearchForm>
  );
};

const ClearRefinements = ({ refine, items }) => {
  return (
    <Styled.ClearButton onClick={() => refine([])}>Clear</Styled.ClearButton>
  );
};

const ConnectedClearAllRefinements = connectCurrentRefinements(
  ClearRefinements
);

export default connectSearchBox(SearchBox);
