import { useRouter } from 'next/router';

import {
  CampusFilter,
  Layout,
  MainPhotoHeader,
  MarketingHeadline,
} from 'components';
import { getChannelId, getMetaData, getSlugFromURL } from 'utils';
import IDS from 'config/ids';
import { initializeApollo } from 'lib/apolloClient';
import { CardGrid, Longform, Section } from 'ui-kit';
import { GET_CONTENT_CHANNEL } from 'hooks/useContentChannel';
import { GET_CAMPUSES } from 'hooks/useCampuses';
import { GET_CONTENT_BY_SLUG } from 'hooks/useContentBySlug';

export default function Page({ data = {}, campuses, dropdownData }) {
  const router = useRouter();

  if (data.loading || router.isFallback) {
    return null;
  }

  const childContent = data.childContentItemsConnection?.edges;
  const ctaLinks = data.ctaLinks;

  return (
    <Layout meta={getMetaData(data)} bg="bg_alt" dropdownData={dropdownData}>
      <MainPhotoHeader
        src={data.coverImage?.sources?.[0].uri || ''}
        title={data.title}
        subtitle={data.subtitle}
        summary={data.summary}
        showTitleOverImage={data.showTitleOverImage}
        mb={{ _: 'l', md: 'xxl' }}
      />
      {data.htmlContent && (
        <Section>
          <Longform
            mb={{ _: 'l', md: 'xxl' }}
            dangerouslySetInnerHTML={{ __html: data.htmlContent }}
          />
        </Section>
      )}
      {childContent?.length ? (
        <Section>
          <CampusFilter
            mb={{ _: 'l', md: 'xxl' }}
            filterWidth="200px"
            data={childContent}
            campuses={campuses}
          >
            {({ filteredData }) => (
              <CardGrid columns="1">
                {filteredData.map(({ node }, i) => (
                  <MarketingHeadline
                    key={node.id}
                    image={{
                      src: node.coverImage?.sources?.[0]?.uri,
                    }}
                    justify={i % 2 === 0 ? 'left' : 'right'}
                    title={node.title}
                    description={node.summary}
                    actions={
                      node.linkText
                        ? [
                            {
                              label: node.linkText,
                              onClick: () => {
                                router.push(
                                  node.linkURL ||
                                    `/${getSlugFromURL(node?.sharing?.url)}`
                                );
                              },
                            },
                          ]
                        : []
                    }
                  />
                ))}
              </CardGrid>
            )}
          </CampusFilter>
        </Section>
      ) : null}
      {ctaLinks.length ? (
        <Section bg="rgba(142, 142, 147, 0.12)">
          <CardGrid my={{ _: 'l', md: 'xxl' }} columns="1">
            {ctaLinks?.map((cta, i) => (
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
        </Section>
      ) : null}
      {data.secondaryHTML && (
        <Section>
          <Longform
            mb={{ _: 'l', md: 'xxl' }}
            dangerouslySetInnerHTML={{ __html: data.secondaryHTML }}
          />
        </Section>
      )}
    </Layout>
  );
}

export async function getStaticProps(context) {
  const apolloClient = initializeApollo();

  const pageResponse = await apolloClient.query({
    query: GET_CONTENT_BY_SLUG,
    variables: {
      slug: context.params.page,
    },
  });

  const submenuLinks = await apolloClient.query({
    query: GET_CONTENT_CHANNEL,
    variables: {
      itemId: getChannelId(IDS.ABOUT_PAGES),
    },
  });

  const campusesResponse = await apolloClient.query({
    query: GET_CAMPUSES,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      data: pageResponse?.data?.getContentBySlug,
      submenuLinks:
        submenuLinks?.data?.node?.childContentItemsConnection?.edges,
      campuses: campusesResponse?.data?.campuses || [],
    },
    revalidate: 60, // In seconds
    redirect: pageResponse?.data?.getContentBySlug?.sharing.url.includes(
      'meet-our-staff'
    )
      ? {
          destination: '/search?category=Staff&p=1',
          permanent: false,
        }
      : null,
  };
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo();

  const pagesResponse = await apolloClient.query({
    query: GET_CONTENT_CHANNEL,
    variables: {
      itemId: `ContentChannel:${IDS.ABOUT_PAGES}`,
    },
  });

  const aboutPages = pagesResponse?.data?.node?.childContentItemsConnection?.edges?.map(
    ({ node }) => node
  );

  // Get the paths we want to pre-render
  const paths = aboutPages.map(({ sharing }) => ({
    params: { page: getSlugFromURL(sharing?.url) },
  }));

  // Fallback true - if a page doesn't exist we will render it on the fly.
  return { paths, fallback: true };
}
