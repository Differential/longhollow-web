import { useEffect, useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  Pagination,
  Panel,
} from 'react-instantsearch-dom';
import { useRouter } from 'next/router';
import Styled from './Search.styles';
import { Box, Button, Heading } from 'ui-kit';
import CategoriesList from './CategoriesList';
import SearchBox from './SearchBox';
import Hit from './Hit';
import RefinementsList from './RefinementsList';

const searchClient = algoliasearch(
  'KXH2MCDDBD',
  '7938b74cef1ef3dd0722fe36e418d2c7'
);

const DEBOUNCE_TIME = 600;

const createURL = state => {
  const queryParts = [];

  if (state?.refinementList) {
    Object.keys(state.refinementList).forEach(key => {
      if (state.refinementList[key]) {
        queryParts.push(`${key}=${state.refinementList[key]}`);
      }
    });
  }

  if (state?.query) {
    queryParts.push(`q=${state.query}`);
  }

  return queryParts.length ? `?${queryParts.join('&')}` : '';
};

const searchStateToUrl = searchState => `/search${createURL(searchState)}`;

const urlToSearchState = router => {
  const { q: query, ...refinements } = router.query;
  const refinementList = {};
  if (refinements) {
    Object.keys(refinements).forEach(refinement => {
      refinementList[refinement] =
        refinements[refinement]?.split(',')?.filter(r => Boolean(r)) || [];
    });
  }

  return {
    query,
    refinementList,
  };
};

function Search({ filtering, setFiltering }) {
  const router = useRouter();
  const [searchState, setSearchState] = useState(urlToSearchState(router));

  // router.query may not have query params on initial render
  useEffect(() => {
    setSearchState(urlToSearchState(router));
  }, [router]);

  useEffect(() => {
    if (!searchState.refinementList?.category?.length && filtering) {
      setFiltering(false);
    }
  }, [searchState.refinementList?.category, filtering, setFiltering]);

  const [debouncedSetState, setDebouncedSetState] = useState(null);

  const onSearchStateChange = updatedSearchState => {
    clearTimeout(debouncedSetState);

    setDebouncedSetState(
      setTimeout(() => {
        router.replace(
          searchStateToUrl(updatedSearchState),
          searchStateToUrl(updatedSearchState),
          { shallow: true }
        );
      }, DEBOUNCE_TIME)
    );

    setSearchState(updatedSearchState);
  };

  return (
    <div className="ais-InstantSearch">
      <InstantSearch
        indexName="prod_ContentItem"
        searchClient={searchClient}
        searchState={searchState}
        onSearchStateChange={onSearchStateChange}
        createURL={createURL}
      >
        <div className={`search-container ${filtering ? 'filtering' : ''}`}>
          <SearchBox onSearchStateChange={onSearchStateChange} />
          <Panel header="Category" className="categories">
            <CategoriesList
              attribute="category"
              defaultRefinement={searchState.refinementList?.category}
            />
          </Panel>
        </div>
        <Box
          display="flex"
          flexDirection={{ _: 'column', lg: 'row' }}
          position="relative"
        >
          <RefinementsList
            categories={searchState.refinementList?.category || []}
            filtering={filtering}
          />
          <div className={`right-panel ${filtering ? 'filtering' : ''}`}>
            <Hits hitComponent={Hit} />
            <Pagination />
          </div>
        </Box>
      </InstantSearch>
      {searchState.refinementList?.category?.length ? (
        <Styled.FilterButton>
          <Button color="primary" onClick={() => setFiltering(!filtering)}>
            <Heading fontSize="h4">{filtering ? 'Close' : 'Filter'}</Heading>
          </Button>
        </Styled.FilterButton>
      ) : null}
    </div>
  );
}

export default Search;
