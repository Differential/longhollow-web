import { useRouter } from 'next/router';

import { GET_CONTENT_ITEM } from 'hooks/useContentItem';
import {
  ArticleLink,
  Layout,
  MainPhotoHeader,
  MarketingHeadline,
} from 'components';
import { Box, CardGrid } from 'ui-kit';
import { getChildrenByType } from 'utils';
import IDS from 'config/ids';
import { initializeApollo } from 'lib/apolloClient';

function getItemId(id) {
  return `UniversalContentItem:${id}`;
}

export default function Page({ data }) {
  const router = useRouter();

  const { loading, error, node = {} } = data;

  if (loading) {
    return null;
  } else if (error) {
    router.push('/next-steps');
  }

  const generalChildren = getChildrenByType(
    node.childContentItemsConnection?.edges,
    IDS.GENERAL
  );

  return (
    <Layout title={`Next Steps - ${node.title}`} bg="bg_alt">
      <MainPhotoHeader
        src={node.coverImage?.sources?.[0].uri || ''}
        title={node.title}
        subtitle={node.subtitle}
        summary={node.summary}
      />
      <CardGrid px="xxl" py="xl" columns="1">
        {node.ctaLinks?.map((cta, i) => (
          <MarketingHeadline
            key={i}
            image={{
              src: cta.image?.sources?.[0]?.uri,
            }}
            justify={i % 2 === 0 ? 'left' : 'right'}
            title={cta.title}
            description={cta.body}
            actions={[
              {
                label: cta.buttonText,
                onClick: () => router.push(cta.buttonLink),
              },
            ]}
          />
        ))}
      </CardGrid>
      {node.htmlContent && (
        <Box
          px="xxl"
          py="xl"
          dangerouslySetInnerHTML={{ __html: node.htmlContent }}
        />
      )}
      {generalChildren.length ? (
        <CardGrid px="xxl" py="xl" columns="2" gridColumnGap="xl">
          {generalChildren.map(({ node }, i) => (
            <ArticleLink
              key={node.id}
              imageSrc={node.coverImage?.sources?.[0]?.uri}
              justify={i % 2 === 0 ? 'left' : 'right'}
              title={node.title}
              description={node.summary}
              urlText={node.featureFeed?.features[0].action.title}
              url={node.featureFeed?.features[0].action.relatedNode.url}
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
      skip: !context.params.page,
      fetchPolicy: 'no-cache',
    });

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
        data: pageResponse?.data,
      },
    };
  } catch (e) {
    return {
      redirect: { destination: '/next-steps', permanent: false },
    };
  }
}