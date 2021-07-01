import { LargeImage, Layout, MainPhotoHeader } from 'components';
import { GET_MESSAGE_CHANNEL } from 'hooks/useMessageChannel';
import { Box, Button, Section } from 'ui-kit';
import { useRouter } from 'next/router';
import { getIdSuffix, getMetaData, getChannelId, getSlugFromURL } from 'utils';
import { useTheme } from 'styled-components';
import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { initializeApollo } from 'lib/apolloClient';
import IDS from 'config/ids';
import { GET_MESSAGE_SERIES } from 'hooks/useMessageSeries';
import { GET_CONTENT_BY_SLUG } from 'hooks/useContentBySlug';

export default function Channel({ item, dropdownData } = {}) {
  const router = useRouter();
  const theme = useTheme();

  const [videos, setVideos] = useState(
    item?.childContentItemsConnection?.edges || []
  );
  const [cursor, setCursor] = useState(
    item?.childContentItemsConnection?.pageInfo?.endCursor
  );

  const [fetchVideos, { loading }] = useLazyQuery(GET_MESSAGE_CHANNEL, {
    onCompleted: data => {
      setVideos([...videos, ...data?.node?.childContentItemsConnection?.edges]);
      setCursor(data?.node?.childContentItemsConnection?.pageInfo?.endCursor);
    },
  });

  if (router.isFallback) {
    return null;
  }

  const totalVideoCount = item?.childContentItemsConnection?.totalCount || 0;

  return (
    <Layout meta={getMetaData(item)} dropdownData={dropdownData}>
      <MainPhotoHeader
        src={item?.coverImage.sources?.[0]?.uri}
        title={item?.title}
        showTitleOverImage={false}
      />
      <Section>
        <Box
          display="flex"
          my="xl"
          mr={`-${theme.space.m}`}
          flexWrap="wrap"
          justifyContent="center"
        >
          {videos?.map(({ node }) => (
            <LargeImage
              key={node.id}
              text={node.title}
              color="white"
              src={node?.coverImage?.sources?.[0].uri}
              height="350px"
              maxWidth="400px"
              mr="m"
              mb="m"
              action={() =>
                router.push(`/${getSlugFromURL(node?.sharing?.url)}`)
              }
            />
          ))}
        </Box>
      </Section>
      {totalVideoCount > videos?.length ? (
        <Button
          onClick={() => {
            fetchVideos({
              variables: { itemId: item.id, after: cursor },
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

  const itemResponse = await apolloClient.query({
    query: GET_CONTENT_BY_SLUG,
    variables: {
      slug: context.params.channel,
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      item: itemResponse?.data?.getContentBySlug,
    },
  };
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo();
  // Get the paths we want to pre-render
  const series = Object.values(IDS.SERIES);

  const channels = (
    await Promise.all(
      series?.map(id =>
        apolloClient.query({
          query: GET_MESSAGE_SERIES,
          variables: {
            itemId: getChannelId(id),
          },
        })
      )
    )
  ).flatMap(({ data }) =>
    data.node.childContentItemsConnection?.edges?.map(({ node }) => ({
      channel: node,
      seriesId: data.node.id,
    }))
  );

  const paths = channels.map(({ channel, seriesId }) => ({
    params: {
      channel: getSlugFromURL(channel?.sharing?.url),
      series: getIdSuffix(seriesId),
    },
  }));

  // Fallback true - if a page doesn't exist we will render it on the fly.
  return { paths, fallback: true };
}
