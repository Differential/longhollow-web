import { useEffect, useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  Pagination,
  ClearRefinements,
  RefinementList,
  Configure,
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

function Search({ filtering, setFiltering }) {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!categories.length && filtering) {
      setFiltering(false);
    }
  }, [categories, filtering, setFiltering]);

  return (
    <div className="ais-InstantSearch">
      <InstantSearch
        indexName="prod_ContentItem"
        searchClient={searchClient}
        onSearchStateChange={state => {
          setCategories(state.refinementList?.category || []);
          router.replace({
            query: { categories: state.refinementList?.category },
          });
        }}
      >
        <div className={`search-container ${filtering ? 'filtering' : ''}`}>
          <SearchBox />
          <Panel header="Category" className="categories">
            <CategoriesList
              attribute="category"
              defaultRefinement={router.query.categories}
            />
          </Panel>
        </div>
        <Box
          display="flex"
          flexDirection={{ _: 'column', lg: 'row' }}
          position="relative"
        >
          <RefinementsList categories={categories} filtering={filtering} />
          <div className={`right-panel ${filtering ? 'filtering' : ''}`}>
            <Hits hitComponent={Hit} />
            <Pagination />
          </div>
        </Box>
      </InstantSearch>
      {categories?.length ? (
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
