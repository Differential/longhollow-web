import { useLazyQuery } from '@apollo/client';
import { LargeImage, Layout } from 'components';
import IDS from 'config/ids';
import { GET_MESSAGE_SERIES } from 'hooks/useMessageSeries';
import { initializeApollo, safeQuery } from 'lib/apolloClient';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Button, Heading } from 'ui-kit';
import { getChannelId, getMetaData, getSlugFromURL } from 'utils';

export default function Series({ item, dropdownData } = {}) {
  const router = useRouter();

  const [series, setSeries] = useState(
    item?.childContentItemsConnection?.edges || []
  );
  const [cursor, setCursor] = useState(
    item?.childContentItemsConnection?.pageInfo?.endCursor
  );

  const [fetchMore, { data: fetchMoreData, loading }] =
    useLazyQuery(GET_MESSAGE_SERIES);

  useEffect(() => {
    if (!fetchMoreData?.node) return;
    const newEdges =
      fetchMoreData?.node?.childContentItemsConnection?.edges || [];
    const newCursor =
      fetchMoreData?.node?.childContentItemsConnection?.pageInfo?.endCursor;
    setSeries(prev => [...prev, ...newEdges]);
    setCursor(newCursor);
  }, [fetchMoreData]);

  if (router.isFallback) {
    return null;
  }

  const totalSeriesCount = item?.childContentItemsConnection?.totalCount || 0;

  return (
    <Layout meta={getMetaData(item)} dropdownData={dropdownData}>
      <Heading
        mt="l"
        textAlign="center"
        fontWeight="800"
        fontSize="h1"
        lineHeight="h1"
      >
        {item?.name}
      </Heading>
      <Box display="flex" my="m" flexWrap="wrap" justifyContent="center">
        {series.map(({ node }) => (
          <LargeImage
            key={node?.id}
            text={node?.title}
            color="white"
            src={node?.coverImage?.sources?.[0].uri}
            height={{ sm: '350px' }}
            size={{ _: 's', md: 'm' }}
            maxWidth="400px"
            mx="s"
            mb="m"
            action={() =>
              router.push(
                `/watch/${router.query.series}/${getSlugFromURL(
                  node?.sharing?.url
                )}`
              )
            }
          />
        ))}
      </Box>
      {totalSeriesCount > series?.length ? (
        <Button
          onClick={() => {
            fetchMore({
              variables: { itemId: item?.id, after: cursor },
            });
          }}
          status={loading ? 'LOADING' : 'SUCCESS'}
          mx="auto"
          mb="l"
        >
          {loading ? 'Loading More' : 'Load More'}
        </Button>
      ) : null}
    </Layout>
  );
}

export async function getStaticProps(context) {
  const apolloClient = initializeApollo();

  const seriesResponse = await safeQuery(apolloClient, {
    query: GET_MESSAGE_SERIES,
    variables: {
      itemId: getChannelId(context.params.series),
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      item: seriesResponse?.data?.node,
    },
    revalidate: 60, // In seconds
  };
}

export async function getStaticPaths() {
  // Get the paths we want to pre-render
  const paths = Object.values(IDS.SERIES).map(id => ({
    params: { series: id },
  }));

  // Fallback true - if a page doesn't exist we will render it on the fly.
  return { paths, fallback: true };
}
