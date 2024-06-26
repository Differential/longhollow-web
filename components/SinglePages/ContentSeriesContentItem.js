import { useLazyQuery } from '@apollo/client';
import { LargeImage, Layout, MainPhotoHeader } from 'components';
import { GET_MESSAGE_CHANNEL } from 'hooks/useMessageChannel';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTheme } from 'styled-components';
import { Box, Button, Section } from 'ui-kit';
import { getMetaData, getSlugFromURL } from 'utils';

export default function ContentSeriesContentItem({ item, dropdownData } = {}) {
  const router = useRouter();
  const theme = useTheme();

  const [videos, setVideos] = useState(
    item?.childContentItemsConnection?.edges
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
      />
      <Section>
        <Box
          display="flex"
          my="xl"
          mr={`-${theme.space.m}`}
          px={{ _: 'l', md: 'xxl' }}
          flexWrap="wrap"
          justifyContent="center"
        >
          {videos.map(({ node }) => (
            <LargeImage
              key={node.id}
              text={node.title}
              color="white"
              src={item.coverImage.sources?.[0].uri}
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
      {totalVideoCount > videos.length ? (
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
