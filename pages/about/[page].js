import { useRouter } from 'next/router';

import { GET_CONTENT_ITEM } from 'hooks/useContentItem';
import { Layout, MainPhotoHeader, MarketingHeadline } from 'components';
import { getChildrenByType, getItemId } from 'utils';
import IDS from 'config/ids';
import { initializeApollo } from 'lib/apolloClient';
import { Box, CardGrid } from 'ui-kit';

export default function Page({ data }) {
  const router = useRouter();

  const generalChildren = getChildrenByType(
    data.childContentItemsConnection?.edges,
    IDS.GENERAL
  );

  return (
    <Layout title={`About - ${data.title}`} bg="bg_alt">
      <MainPhotoHeader
        src={data.coverImage?.sources?.[0].uri || ''}
        title={data.title}
        subtitle={data.subtitle}
        summary={data.summary}
      />
      {data.htmlContent && (
        <Box
          px="xxl"
          py="xl"
          dangerouslySetInnerHTML={{ __html: data.htmlContent }}
        />
      )}
      {generalChildren.length ? (
        <CardGrid px="xxl" py="xl" columns="1">
          {generalChildren.map(({ node }, i) => (
            <MarketingHeadline
              key={node.id}
              image={{
                src: node.coverImage?.sources?.[0]?.uri,
              }}
              justify={i % 2 === 0 ? 'left' : 'right'}
              title={node.title}
              description={node.summary}
              actions={node.featureFeed?.features?.length ? [
                {
                  label: node.featureFeed?.features[0].action.title,
                  onClick: () => {
                    router.push(
                      node.featureFeed?.features[0].action.relatedNode.url
                    );
                  },
                },
              ] : []}
            />
          ))}
        </CardGrid>
      ) : null}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const apolloClient = initializeApollo();

  try {
    const pageResponse = await apolloClient.query({
      query: GET_CONTENT_ITEM,
      variables: {
        itemId: getItemId(context.params.page),
      },
    });

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
        data: pageResponse?.data?.node,
      },
    };
  } catch (e) {
    return {
      redirect: { destination: '/about', permanent: false },
    };
  }
}
