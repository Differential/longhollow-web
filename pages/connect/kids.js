import { ArrowRight, Info } from 'phosphor-react';
import {
  ArticleLinks,
  ArticleLink,
  Countdown,
  EventCallout,
  EventsCallout,
  FlagCTA,
  Layout,
  MainPhotoHeader,
  MarketingHeadline,
  MeetTheStaff,
  PageSplit,
  Quote,
} from 'components';
import { Box, CardGrid, Heading, Text, theme } from 'ui-kit';
import { addDays } from 'date-fns';
import { noop } from 'utils';
import { initializeApollo } from 'lib/apolloClient';
import { GET_CONTENT_ITEM } from 'hooks/useContentItem';

export default function Kids(props) {
  const article = props.articles?.[0];
  return (
    <Layout title="Connect - Kids">
      <MainPhotoHeader
        src={props.page?.coverImage?.sources?.[0]?.uri}
        content={
          <Box position="absolute" left="97px" bottom="73px" maxWidth="440px">
            <Heading
              color="neutrals.100"
              variant="h2"
              opacity="50%"
              fontWeight="800"
              textTransform="uppercase"
            >
              LH Kids
            </Heading>
            <Heading
              color="neutrals.100"
              variant="h1"
              fontWeight="800"
              textTransform="uppercase"
            >
              Lorem ipsum doler sit itmut del fal some big bold header.
            </Heading>
            <Heading
              color="neutrals.100"
              variant="h3"
              fontWeight="700"
              maxWidth="360px"
            >
              Lorem ipsum doler sit itmut del fal some big bold header.
            </Heading>
          </Box>
        }
      />
      <CardGrid
        px="xxl"
        py="xl"
        gridColumnGap="xl"
        columns="2"
        breakpoints={[{ breakpoint: 'lg', columns: 1 }]}
      >
        <ArticleLinks>
          {Array.from(Array(6)).map(() => (
            <ArticleLink
              title={article?.title}
              description="At Long Hollow Weekday Preschool, we are committed to creating a nurturing environment for preschoolers to grow."
              url="/"
              urlText="Learn More"
              imageSrc={article?.coverImage?.sources?.[0]?.uri}
              mb="s"
            />
          ))}
        </ArticleLinks>
        <Box zIndex="2">
          <EventsCallout
            title="General Info"
            icon={
              <Info
                color={theme.colors.neutrals[900]}
                opacity="30%"
                size={22}
                style={{ marginRight: '5px' }}
              />
            }
          >
            <EventCallout
              title="Sunday Morning"
              description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enit. "
            />
            <EventCallout
              title="Wednesday Night"
              description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enit. "
            />
            <EventCallout
              title="Special Needs"
              description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enit. "
            />
            <EventCallout
              title="Weekday Preschool"
              description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enit. "
            />
            <EventCallout
              title="Staff"
              description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enit. "
            />
          </EventsCallout>
        </Box>
      </CardGrid>
      <CardGrid
        px="xxl"
        py="xxl"
        gridColumnGap="l"
        columns="1"
        breakpoints={[{ breakpoint: 'lg', columns: 1 }]}
      >
        <CardGrid
          gridColumnGap="l"
          columns="2"
          breakpoints={[{ breakpoint: 'lg', columns: 1 }]}
        >
          <MarketingHeadline
            title={
              <Heading color="neutrals.900" variant="h2" fontWeight="800">
                Volunteer.
              </Heading>
            }
            supertitle="LH KIDS"
            description="We LOVE families at Long Hollow and that means we’re intentional about investing in and discipling the next generation. If you’re interested in making a difference in the lives of children and impacting families, then check out the volunteer opportunities in LH Kids."
            actions={[
              {
                color: 'primary',
                label: 'Sign up now',
              },
              {
                color: 'quaternary',
                label: 'Fill Out Form',
                variant: 'outlined',
              },
            ]}
          />
          <Quote
            alignment="left"
            color="quaternary"
            title={
              <Box display="flex">
                <Heading
                  color="quaternary"
                  fontSize="18px"
                  lineHeight="27px"
                  fontWeight="700"
                >
                  LH&nbsp;
                </Heading>
                <Heading
                  textTransform="uppercase"
                  color="quaternary"
                  fontSize="18px"
                  lineHeight="27px"
                  fontWeight="400"
                >
                  Voluntary Story
                </Heading>
              </Box>
            }
            attribution={props.quote?.attribution}
            actionLabel="Full story"
            actionLink="/"
            text={
              <Text
                lineHeight="h3"
                fontSize="18px"
                color="neutrals.900"
                opacity="60%"
                textAlign="left"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit,
                arcu consequat vestibulum amet. Velit nunc augue a blandit diam.
                Malesuada eget faucibus amet hac.
              </Text>
            }
            avatar={props.quote?.coverImage?.sources?.[0]?.uri}
          />
        </CardGrid>
      </CardGrid>
      <CardGrid
        px="xxl"
        py="l"
        columns="2"
        gridColumnGap="l"
        gridRowGap="xxl"
        breakpoints={[{ breakpoint: 'lg', columns: 1 }]}
      >
        <Countdown
          src="https://www.figma.com/file/zlluMsbAFPmWX6Z50iG86s/image/2c35a9fea98b9a3404dfaca24537e5a91c123c48"
          width="595px"
          height="451px"
          borderRadius="image"
          alignItems="flex-end"
          date={addDays(new Date(), 5)}
        />
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Text
            fontSize="s"
            lineHeight="s"
            mb="s"
            color="neutrals.900"
            opacity="60%"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus
            massa aliquam volutpat in integer aliquam. Convallis tempor quis sed
            et vestibulum sed. Hendrerit consequat praesent sit neque. Felis in
            donec sit nisl feugiat cursus dictum velit
          </Text>
          <Text
            fontSize="xs"
            lineHeight="xs"
            color="neutrals.900"
            opacity="30%"
          >
            ipsum dolor sit amet, consectetur adipiscing elit. Tellus massa
            aliquam volutpat in integer aliquam. Convallis tempor quis sed et
            vestibulum sed. Hendrerit consequat praesent sit neque. Felis in
            donec sit nisl feugiat cursus dictum velit.
          </Text>
        </Box>
      </CardGrid>
      <FlagCTA
        right
        color="primary"
        height="227px"
        width="434px"
        mt={{ _: 0, lg: '-110px' }}
      >
        <Heading
          color="white"
          fontWeight="700"
          fontSize="28px"
          lineHeight="35px"
          mb="s"
        >
          Check out our events!
        </Heading>
        <Box display="flex" alignItems="center">
          <Text
            fontWeight="600"
            color="neutrals.100"
            opacity="60%"
            fontSize="s"
            lineHeight="s"
            display="flex"
            alignItems="center"
          >
            The good news
            <ArrowRight weight="bold" size={18} style={{ marginLeft: '5px' }} />
          </Text>
        </Box>
      </FlagCTA>
      <PageSplit title="Meet the Staff" variant="h3" mt="m" mb="xl" />
      <CardGrid
        px="xl"
        gridColumnGap="l"
        columns="4"
        breakpoints={[
          { breakpoint: 'xl', columns: 2 },
          { breakpoint: 'lg', columns: 1 },
        ]}
        justifyItems="center"
      >
        <MeetTheStaff
          src="/staff/005.png"
          name="Amet minim"
          description="Nonn deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
        />
        <MeetTheStaff
          src="/staff/006.png"
          name="Amet minim"
          description="Nonn deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
        />
        <MeetTheStaff
          src="/staff/007.png"
          name="Amet minim"
          description="Nonn deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
        />
        <MeetTheStaff
          src="/staff/008.png"
          name="Amet minim"
          description="Nonn deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
        />
      </CardGrid>
      <Box m="xl">
        <Quote
          color="quaternary"
          attribution={props.quote?.attribution}
          actionLabel="Full story"
          actionLink="/lh-story-quote"
          text={
            <Heading
              fontSize="xl"
              lineHeight="xl"
              fontWeight="600"
              color="neutrals.900"
            >
              When trauma and loss left me adrift and disoriented, God provided
              faithful believers to remind me that He is good, His Word can be
              trusted, and He will never leave or forsake us.
            </Heading>
          }
          avatar={props.quote?.coverImage?.sources?.[0]?.uri}
        />
      </Box>
      <MarketingHeadline
        px="184px"
        my="xl"
        image={{ src: '/general/contact.jpeg' }}
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
    </Layout>
  );
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  const pageResponse = await apolloClient.query({ query: GET_CONTENT_ITEM, variables: {
    itemId: "UniversalContentItem:3d0cad78547aa696d2adb63ba094010b"
  } });

  const articleQueries = ['e07dbf80297d466a1a44ac37c6c8f261'].map(async (id) => {
    const article = await apolloClient.query({ query: GET_CONTENT_ITEM, variables: {
      itemId: `UniversalContentItem:${id}`
    }});

    return article?.data?.node;
  });

  const articles = await Promise.all(articleQueries);

  const quoteResponse = await apolloClient.query({ query: GET_CONTENT_ITEM, variables: {
    itemId: "UniversalContentItem:2ad5fbc93b17ac149e740a7ee11a5329"
  } });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      page: pageResponse?.data?.node,
      articles,
      quote: quoteResponse?.data?.node,
    },
  };
}
