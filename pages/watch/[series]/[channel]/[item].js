import { Layout, MainPhotoHeader } from 'components';
import { initializeApollo } from 'lib/apolloClient';
import { GET_MEDIA_CONTENT_ITEM } from 'hooks/useMediaContentItem';
import VideoPlayer from 'components/VideoPlayer/VideoJSPlayer';
import { Heading, Section } from 'ui-kit';
import { getMetaData } from 'utils';

function getItemId(id) {
  return `MediaContentItem:${id}`;
}

export default function Item({ item }) {
  const src = item.videos?.[0]?.sources?.[0]?.uri;

  return (
    <Layout meta={getMetaData(item)}>
      <MainPhotoHeader src={item.coverImage?.sources?.[0]?.uri} />
      <Section my="xl">
        <Heading variant="h2" fontWeight="800" mb="m">
          {item.title}
        </Heading>
        <Heading variant="h4" fontWeight="500" mb="m">
          {item.summary}
        </Heading>
        {src ? (
          <VideoPlayer
            my="l"
            src={src}
            poster={item?.coverImage?.sources?.[0]?.uri}
          />
        ) : null}
      </Section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const apolloClient = initializeApollo();

  const itemResponse = await apolloClient.query({
    query: GET_MEDIA_CONTENT_ITEM,
    variables: {
      itemId: getItemId(context.params.item),
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      item: itemResponse?.data?.node,
    },
  };
}
