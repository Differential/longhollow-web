import { Info } from 'phosphor-react';
import {
  ArticleLink,
  EventCallout,
  EventsCallout,
  Layout,
  MainPhotoHeader,
  MarketingHeadline,
  PageSplit,
  Quote,
  ValuesRow,
} from 'components';
import { Box, CardGrid, Heading, theme } from 'ui-kit';
import { getChildrenByType, noop } from 'utils';
import { initializeApollo } from 'lib/apolloClient';
import { GET_CONTENT_ITEM } from 'hooks/useContentItem';
import IDS from 'config/ids';

export default function Story(props) {
  const mainHeaderData = {
    src: props.page?.coverImage?.sources?.[0]?.uri,
    title: `LH ${props.page?.title}`,
    description: 'Lorem ipsum doler sit itmut del fal some big bold header.',
    details: 'Lorem ipsum doler sit itmut del fal some big bold header.',
  };

  const pageChildren = props.page?.childContentItemsConnection?.edges;
  const articles = getChildrenByType(pageChildren, IDS.ARTICLES);

  const articleLinks = articles.map(({ node: article }) => ({
      title: article.title,
      description: article.summary,
      url: '/',
      urlText: 'Learn More',
      imageSrc: article.images?.[0]?.sources?.[0]?.uri,
  }));

  const eventsData = {
    title: 'General LH Info',
    events: [
      {
        title: 'First Time?',
        description:
          'We’re so glad you’ve decided to check out Long Hollow! You’ll find a list of commonly asked questions below.',
        imageSrc:
          'https://s3-alpha-sig.figma.com/img/cf38/d6e4/157839d4fa2d5661bc9ad98c732b3810?Expires=1613347200&Signature=ZTw6HZDhFuvhpfxNBvteXuJy~AuLPEhkpaBYO7XrsJRPCVTaf~-Lfd5XAy~XqmVnnWWK7W4YieO2jUfzI1hHHPnpeJVcu5vJUu1h6gsxGpEztGcn9rOP0huBQeM5y-zSgGLexMm~Ky80rGUmY6OvjZxb7013MiDJQAdRUk6y7QPacIWe9PbjikldQMvOALq-8njWcX1zV2MdF14r4fxKGqtu6UCHF7pUXvvI4EyQBwX8FRT6jENfXv4vJszJKHU-EMIPXC0kVJYsLUhQ3Yw1~txjJvw23p0gC3HGDkLLRtXCVoUHfkK2u36jRV8yw~-IkXxdZIaXd5IllqAkgwxEIw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      },
      {
        title: 'Membership',
        description:
          'Do you want to know more about Long Hollow? Whether you’re exploring joining the church, or are just looking for your next step to get more plugged in, our monthly Starting Point class is the place for you!',
        imageSrc:
          'https://s3-alpha-sig.figma.com/img/9c87/d12a/805b1f9864f4780a0159b3d54369c49d?Expires=1613347200&Signature=XfEDnf1h7j6sc8LsKpkfAAKeBATr~K049UWqOFyCV-dMfNUVQLyUTpWXDQEABq9vNM910FqcEFhUrV7xTEF6SQaotFKfUs-BW49L~3pVQYHFrrW0JMz7-7BXNhTIcRXRBggHz6hD29z2s3Sza7tQIWh~zGVKFwT0gYGpZKGi~9hliG-zIjEtmtCa2XpsTF5Pp~wYvU2nEwKJK3GsaXV7Ow065duOIQ07g2XlyrQSDM4G9EDU-FP4r-H0ApMrQH9br-HkB7pDnLUEVnThW8M-Qz5qEIzMDHsDZF0lTGY2em3MPJhCFH63qaM3VEpSJsPLre3N3YQiDYNtPubLbzcZ5g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      },
      {
        title: 'Times and Locations',
        description:
          'All gatherings are now online-only until late January - Join us live every Sunday at Long Hollow Online!',
        imageSrc:
          'https://s3-alpha-sig.figma.com/img/6dc2/9c82/15e327d70c5d1666d888cd3178a71311?Expires=1613347200&Signature=SatNQP4tR6-YZtEMOQBS1oIJOk5WBga9sKbaVu4GVFn8uZDtf1ECDjK5V3PITW8AY8WQTdLHrX65F2op2TfjH2aTpeEsvPwTFBu1TLLeutOEHn-baJyvWST30toH6KtEcEwufjTrcCw3wUbR41AAyzOqCM6ksS5kVx7XyCDjW5cgVttDpp1ka9IZOn3LbynCuP6DKeX20FF3f4eF2Tahq5AUy-Y0yUTASnrW4KFg2u3TEz9zy6c3-7kl~2WckfMp7wtxD2Fxl7xZljkqH8Tx1GQrAVpzZW6iGaqixMOceG7LN0el2eunyh72ZDfJrwbaPBPJX4Poi-OctrTXPQ29fQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      },
      {
        title: 'Our Staff',
        description:
          'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat.',
        imageSrc:
          'https://s3-alpha-sig.figma.com/img/c722/ed8f/ce7f63d70de2b29bd2c6b296fa80ae27?Expires=1613347200&Signature=VwYvf5UdUVpJYepNF~Kof9-kmD3fM6y0e0YdIkb4ts8uJSZn7qDccQDRUFVIOeTwY~ncpWdC4yn3oWblLIqX0jnmqrqeAdbWxiZEz2g5H9fbAbGU74y2a2iFkkJgCB07aAdKO0XaX7ecpATg1gZzRY5aKs6JXKFy3z9A1EwdqUel9mY8tnV2ELn4C-cjbxDqAmOJvjlYRduABH0Yz~6R2YwqxKiz30uVKwm~g7Mf3ZiQL3ZkRiuAJfxoMV4Rm7mR5CClJqYkkc2XbXoIlhtu6zRqmOY0e62I7aXf6SOVGzFwDh5Ls6376NNu8he6JX-7YoOB-kZ-niKov7SrbKB3ZA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      },
    ],
  };
  return (
    <Layout title="About - Story" bg="bg_alt">
      <MainPhotoHeader
        src={mainHeaderData.src}
        content={
          <Box position="absolute" left="97px" bottom="73px" maxWidth="440px">
            <Heading
              color="neutrals.100"
              variant="h2"
              opacity="50%"
              fontWeight="800"
            >
              {mainHeaderData.title}
            </Heading>
            <Heading
              color="neutrals.100"
              variant="h1"
              fontWeight="800"
              textTransform="uppercase"
            >
              {mainHeaderData.description}
            </Heading>
            <Heading
              color="neutrals.100"
              variant="h3"
              fontWeight="700"
              maxWidth="360px"
            >
              {mainHeaderData.details}
            </Heading>
          </Box>
        }
      />
      <CardGrid
        px="xxl"
        pt="xl"
        mb="xxl"
        gridColumnGap="xl"
        columns="2"
        breakpoints={[{ breakpoint: 'lg', columns: 1 }]}
      >
        <Box display="flex" flexDirection="column">
          {articleLinks.map((articleLink, i) => (
            <ArticleLink
              key={i}
              mb={i < articleLinks.length - 1 ? 's' : '0'}
              {...articleLink}
            />
          ))}
        </Box>
        <Box zIndex="2">
          <EventsCallout
            title={eventsData.title}
            icon={
              <Info
                color={theme.colors.neutrals[900]}
                opacity="30%"
                size={22}
                style={{ marginRight: '5px' }}
              />
            }
          >
            {eventsData.events.map((event, i) => (
              <EventCallout key={i} {...event} />
            ))}
          </EventsCallout>
        </Box>
      </CardGrid>
      <CardGrid
        px="xxl"
        my="xxl"
        gridColumnGap="xl"
        gridRowGap="xxl"
        columns="1"
        breakpoints={[{ breakpoint: 'lg', columns: 1 }]}
      >
        <MarketingHeadline
          image={{
            src:
              'https://s3-alpha-sig.figma.com/img/8316/01e5/a8585ef71c1f1859df4e8486db7968f8?Expires=1613347200&Signature=JZK-pjdBCVmLDTWKvMTQy2vWBsPyYrV3~bPvY1~tH~48flavJNMKMSlH4CYH-Cc5NB~ez-tq2UgiA2IWK2EynSH-eO24X1u1373zS6mSJqiy7BUsSjegQpJv8MqrwQHImT5XBNLcl8~gHE4fkQNKEIOOhWpL8WyqaOQOLiAqrZ6cIzfNjnJUN8wHZWraLNBr4lgk2kbDQ34H-L1KAnKSYBWeCYZYq9TPOMgw263T-2XwHozHuXQjbyj5dYFSKRCoXQ-1E89sfl~yPL7j~2Cg2mEWTFOcVGjwQeBCNhB5exWkp933BUlUkxfDxs8Q3I-kBtC-7emRjiEI5g0-wzwqrQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
          }}
          title={
            <>
              <Heading color="neutrals.900" variant="h2" fontWeight="800">
                Who is&nbsp;
              </Heading>
              <Heading color="primary" variant="h2" fontWeight="800">
                Long Hollow?
              </Heading>
            </>
          }
          description="Long Hollow is one church that meets in two locations just north of Nashville. We’re a community of believers with something for everyone; whether you’re checking out the claims of Christ for the first time, or are looking for a new place to call home, Long Hollow has a place for you!"
        />
        <PageSplit title="Explore LH" variant="h3" />
        <Quote
          text={
            <Box>
              <Heading variant="xl" fontWeight="600">
                Long Hollow wants every person to know God, find
                community,&nbsp;
                <Heading color="primary">and CHANGE THE WORLD.</Heading>
              </Heading>
            </Box>
          }
        />
        <ValuesRow
          title={
            <Box display="flex" justifyContent="center">
              <Heading variant="h3" color="black" fontWeight="700">
                Long Hollow is
              </Heading>
            </Box>
          }
          items={[
            {
              title: 'A place for all',
              text:
                'From students to professionals, preschoolers to senior adults, we have ministries tailored specifically to every member of your family. We also have Life Groups, mission trips and special events throughout the year, so there are plenty of opportunities to get involved.',
            },
            {
              title: 'Join us',
              text:
                'This weekend for one of our services. The atmosphere is relaxed and the messages are relevant to your daily life. By putting God’s Word into practice through the Discipleship Pathway, our goal is to help you grow deeper in your relationship with God each and every week.',
            },
          ]}
        />
        <MarketingHeadline
          image={{
            src:
              'https://s3-alpha-sig.figma.com/img/809e/21ff/84f7abd2dec8e66ed842c325c618f51d?Expires=1613347200&Signature=Rkszss7pMAZjRdsHL4lAQR3pcBU7zUWPLGOEut0jWkbCfgHrwn1aH~iP3J79ob8erXbPT0fkH~zad6kKj1wCgnyEiBEhueSNTwdZPUyZ2eY9858231iVURQ5AvbQl0aQf69qQNjD8yhs1mFnSuK0yc2AUH1EOG4ZmaMkTskqt9OVogWpuBf1HUA~NGFEPvLb6aSf7zVuPsJWKagt7SBY3eCNPacR6XbM5hVZCX23tjFLsbe1olvKPUTYCHXjZCx-5ClNyEZE8ggVS1~CbCLXaeXcgI2fsOtMQf2ttIR-Jg~s~JenMd-IsYUCwd1wYCeilc7XvxjR-aMsc039kH4yLg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
          }}
          title={
            <>
              <Heading color="neutrals.900" variant="h2" fontWeight="800">
                Contact&nbsp;
              </Heading>
              <Heading color="primary" variant="h2" fontWeight="800">
                us
              </Heading>
              <Heading color="neutrals.900" variant="h2" fontWeight="800">
                .
              </Heading>
            </>
          }
          description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
          actions={[
            {
              label: 'Connect',
              onClick: noop,
            },
          ]}
        />
      </CardGrid>
    </Layout>
  );
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  const pageResponse = await apolloClient.query({
    query: GET_CONTENT_ITEM,
    variables: {
      itemId: 'UniversalContentItem:16e8b0e37cd4106b15aff27d7470589a',
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      page: pageResponse?.data?.node,
    },
  };
}
