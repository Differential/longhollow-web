import React from 'react';
import { ArrowRight, Circle } from 'phosphor-react';
import { gql, useQuery } from '@apollo/client';

import {
  ArticleLink,
  Carousel,
  FullWidthCTA,
  LargeImage,
  MainPhotoHeader,
  MarketingHeadline,
  Quote,
  ConnectTiles,
} from 'components';
import { Box, CardGrid, Heading, Icon, Text, theme } from 'ui-kit';
import VideoPlayer from 'components/VideoPlayer';
import { useRouter } from 'next/router';

function DefaultMainPhotoHeader(props = {}) {
  const videoPlayers = [
    {
      src:
        'http://embed.wistia.com/deliveries/0e364f7e6f6604384ece8a35905a53a864386e9f.bin',
      title: 'INTRO',
    },
    {
      src:
        'http://embed.wistia.com/deliveries/0e364f7e6f6604384ece8a35905a53a864386e9f.bin',
      title: 'GOOD NEWS',
    },
    {
      src:
        'http://embed.wistia.com/deliveries/0e364f7e6f6604384ece8a35905a53a864386e9f.bin',
      title: 'EVERYONE',
    },
    {
      src:
        'http://embed.wistia.com/deliveries/0e364f7e6f6604384ece8a35905a53a864386e9f.bin',
      title: 'GOD',
    },
  ];

  return (
    <>
      <MainPhotoHeader
        src="https://s3-alpha-sig.figma.com/img/8842/4c68/4e45dbafdc563dce6b086f70e0d4b358?Expires=1614556800&Signature=Z7pkiqqsgiptnBuBvC~-FiuPPMT2YvWy2dmuexln1jOdlpGP9q3SF0U7wqkiu0UQksRoj3swc94NQGdN5dBSP~YLlSrUD5tHMkNQFCUz8yHcqQmNFxPjnBxA-5~Q07Q9rdt9WfJasyJgpBFPlMZPB7wivPTi1ntSegx5YjtYVgD5oxgsw-zN3g7UgSEIU5QNFIoDMoXIh1lHKUoTWthDo3iVXGIjhzgbDQzsJjjX4norSiRM5VFxRYM3MMz7wQkcChLM3PBSQbH5LJy2M8UozptwZwG55cvZWT1CQv3Py4gkC-vVUDIdDjDMIwKfRxCshR1y5jAmIeygs09Li89rCA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
        overlay="linear-gradient(89.49deg, #1c1617 -16.61%, rgba(28, 22, 23, 0) 99.62%)"
        content={
          <>
            <Box
              position="absolute"
              top="0"
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
              width="100%"
            >
              <Carousel neighbors="3d" contentWidth="681px" pl="xxl">
                {videoPlayers.map((vp, i) => (
                  <VideoPlayer key={i} {...vp} />
                ))}
              </Carousel>
            </Box>
            <Box
              position="absolute"
              ml="xl"
              top="0"
              maxWidth="576px"
              height="100%"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              style={{ pointerEvents: 'none' }}
            >
              <Heading
                color="neutrals.100"
                opacity="33%"
                fontWeight="400"
                fontSize="18px"
                lineHeight="16.2px"
                textTransform="uppercase"
                mb="16px"
              >
                Highlights From
              </Heading>
              <Heading
                color="white"
                fontSize="86px"
                lineHeight="77.4px"
                fontWeight="800"
                textTransform="uppercase"
                mb="16px"
              >
                Waiting to enjoy God.
              </Heading>
              <Text
                color="neutrals.100"
                opacity="60%"
                maxWidth="297px"
                fontSize="18px"
                lineHeight="22.5px"
                mb="4px"
              >
                God is never in a rush to do anything, so we need to wait to
                enjoy Him.
              </Text>
              <Text
                color="neutrals.100"
                opacity="33%"
                maxWidth="297px"
                fontSize="14px"
                lineHeight="17.5px"
              >
                Last Sunday | November 19, 2020
              </Text>
            </Box>
          </>
        }
      />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        ml="xl"
        mt="-110px"
      >
        <Heading
          fontSize="18px"
          lineHeight="16.2px"
          textTransform="uppercase"
          color="neutrals.100"
          opacity="33%"
        >
          Full Message
        </Heading>
        <VideoPlayer
          src="https://player.vimeo.com/video/457496548"
          title="GOD"
          height="185px"
        />
      </Box>
    </>
  );
}

const SarahQuote = () => {
  const { data } = useQuery(gql`
    {
      node(id: "ContentChannel:173eb3b93fa2684ae69a30f42fdcea3c") {
        id
        ... on ContentChannel {
          childContentItemsConnection {
            edges {
              node {
                title
                summary
                coverImage {
                  sources {
                    uri
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  return (
    <Quote
      color="primary"
      title={
        <Box display="flex">
          <Heading
            color="primary"
            fontSize="18px"
            lineHeight="27px"
            fontWeight="700"
          >
            LH&nbsp;
          </Heading>
          <Heading
            textTransform="uppercase"
            color="primary"
            fontSize="18px"
            lineHeight="27px"
            fontWeight="400"
          >
            Story
          </Heading>
        </Box>
      }
      attribution={
        data?.node?.childContentItemsConnection?.edges[0]?.node?.title
      }
      actionLabel="Full story"
      actionLink="/lh-story-quote"
      text={data?.node?.childContentItemsConnection?.edges[0]?.node?.summary}
      avatar={
        data?.node?.childContentItemsConnection?.edges[0]?.node?.coverImage
          ?.sources[0]?.uri
      }
    />
  );
};

function FullLengthSermon(props = {}) {
  return (
    <>
      <MainPhotoHeader
        src="https://s3-alpha-sig.figma.com/img/8842/4c68/4e45dbafdc563dce6b086f70e0d4b358?Expires=1613347200&Signature=KeU0~IxuHxeYwSOVDWKCyeJXKzBls-2S~r0nV40ykGcKLQ86mEr53wRSiG2y~kLK4RlOUZkzf33HmXu7wDXnGcckxt6BqqmlCB8i8176HCPeJXj4OEbsTZnEyXmuXURhwkVxNkC1apGOyBb4rW4-MdD9Azn5EXAKFsHjpQcpBj-wxMb5kqtcZo6xyMV7HD3tyRvldpX4NMwsDyVFsdn9BJLZCLx00tOpdduTv-iN9sCiWV35zMum3DnMpEzqfRqDxOfKwBqlZhpdRt~fTl4HJdDFL6x~RpX4gW~YTCzRknoJ3uuJ~LdC~p~UqNrLUvcYqBqixflP51v7FWIaer4WSg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
        overlay="linear-gradient(89.49deg, #1c1617 -16.61%, rgba(28, 22, 23, 0) 99.62%)"
        content={
          <>
            <Box
              position="absolute"
              top="0"
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
              width="100%"
            >
              <Carousel neighbors="3d" contentWidth="681px" pl="xxl">
                <VideoPlayer
                  src="http://embed.wistia.com/deliveries/0e364f7e6f6604384ece8a35905a53a864386e9f.bin"
                  title="INTRO"
                  width="681px"
                />
              </Carousel>
            </Box>
            <Box
              position="absolute"
              ml="xl"
              top="0"
              maxWidth="576px"
              height="100%"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              style={{ pointerEvents: 'none' }}
            >
              <Heading
                color="neutrals.100"
                opacity="33%"
                fontWeight="400"
                fontSize="18px"
                lineHeight="16.2px"
                textTransform="uppercase"
                mb="16px"
              >
                Watch Now
              </Heading>
              <Heading
                color="white"
                fontSize="86px"
                lineHeight="77.4px"
                fontWeight="800"
                textTransform="uppercase"
                mb="16px"
              >
                Good News
              </Heading>
              <Text
                color="neutrals.100"
                opacity="60%"
                maxWidth="297px"
                fontSize="18px"
                lineHeight="22.5px"
                mb="4px"
              >
                Paul shows us that God has given us a new perspective on life.
              </Text>
              <Text
                color="neutrals.100"
                opacity="33%"
                maxWidth="297px"
                fontSize="14px"
                lineHeight="17.5px"
              >
                Last Sunday | November 19, 2020
              </Text>
            </Box>
          </>
        }
      />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        ml="xl"
        mt="-110px"
      >
        <Heading
          fontSize="18px"
          lineHeight="16.2px"
          textTransform="uppercase"
          color="neutrals.100"
          opacity="33%"
        >
          Full Message
        </Heading>
        <VideoPlayer
          src="https://player.vimeo.com/video/457496548"
          title="GOD"
          height="185px"
        />
      </Box>
    </>
  );
}

function LoggedInHomeFeed(props = {}) {
  const router = useRouter();
  return (
    <>
      <CardGrid
        gridColumnGap="l"
        columns="2"
        breakpoints={[{ breakpoint: 'lg', columns: 1 }]}
        px="xxl"
        my="xxl"
      >
        <Box>
          <ArticleLink
            title="Lorem ipsum doler sit itmut this is a title of this story article or news something or thing."
            url="/"
            urlText="Learn more"
            imageSrc="https://s3-alpha-sig.figma.com/img/d503/cf1e/51e2f4afe7a9d1befea1d404776bce58?Expires=1612742400&Signature=CRak1QZFV30oWYfOmofyDhPZYYUSuYLx5PM7veQNCK-J6VdCBLLnh8eNG-gzZHSVnxHkr0W-DVRrRtvGBahERez2kJ~HCg1IQSsXl73m1yvGvBDoXNLHXly67ZJlfHxcKKgYk5iw1uwU3ditcGV1vxpiVdFFBIECr58qlnIbSRmrgWqHBZtWsC16IIuNt68NW~43iIcWUMmqxtM3~EsLRm8XyPqylh37St-e2KNBa22gDFhz2kz5uub7iYR5nZLiYXOoMYI0FeRXXNV0Oj~79pyGCOOi5-xVIRaqlFQhIKrV0I0oO~D2ZDXo2QdXWdqH9Ek6QKG3RlhIzE2ayQQ-Xg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            mb="s"
          />
          <ArticleLink
            title="Lorem ipsum doler sit itmut this is a title of this story article or news something or thing."
            url="/"
            urlText="Learn more"
            imageSrc="https://s3-alpha-sig.figma.com/img/d222/5e20/7026f0d2db6b662bd925005ed3d78375?Expires=1612742400&Signature=gAWCBTp4D7KbI8TALUxCNMI21NhB08Mu5O-BaA~wM5CMp6jlRdy-Q52YMSGw6vZ60EilqDTbxyJ1INP4xrgD5MbdMprqR6D1xu7dbpeZnu72yavDCj26VaShkz62FAM8Y6cPUDzhGJKTxM40EgElerZ0qsFEIuSTNl9y40ZeJWiXa2WwKBKgb2dGmSw5WCVTsARUCYJ1iXiGsOsbY57SZL5m1xVZxFJnl28ioFHOFTmKqvcjpk-xPuk287igAOGSOVEm5psTZ71hjrv9AUGf-s8RrQiDd1ZzcrF1y5Ul6oBQYmBxuhjkCjK2u4RFUcGhOqMokzja4TqpyxCj6rB1SQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            mb="s"
          />
          <ArticleLink
            title="Lorem ipsum doler sit itmut this is a title of this story article or news something or thing."
            url="/"
            urlText="Learn more"
            imageSrc="https://s3-alpha-sig.figma.com/img/493d/14c0/d6d582397dad7960aa07123f3af3ec17?Expires=1612742400&Signature=SpddFW9DyeXdpNgbU~5HczCH8qWgjJ3kjUx7ItiFFtUrZLSZpcPEZRaRpaeIukzmAMW12aHq6w4SDR5lBYAlNSN-ICni49wl1OxXKfzRDB1uQAALGwFzUHYiPMCrLUChsMD1J5OBvDKU2PcapV1sCydekg57fxQSUUsUQ15C5tppmGDLLfrikXSmABnJ3Y70344V3CyNO4Y6CN6CnBoGm5YVPkyLC84FTle0a~YAuSD8rrBAlTMTuJQi8jaB6qG6OcXt93WkXvpAWKQhOZhUIKAapn6er4kOra27v~VQweYGd8a4afbbE98pd2fnknsWqZkKsdLZfGuPMokwvSYEng__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
          />
        </Box>
        <LargeImage
          text="Celebrate the Hope of Christ with us."
          color="white"
          src="https://s3-alpha-sig.figma.com/img/819d/924a/5b523972e95961c459d926736ea2f611?Expires=1612742400&Signature=KRqft30qRfZq4MpUq27xME4hIEj4gFYr4s~lXEFpUwlDGfVCXfUsCu~JNXBicN9MnQYNW84z84g6RwRkDxQsrYlRGGeE~0wBdHAbSEWx~lZIG9k7JK8iCoVEWSsryT-xrQY-o4rO7AaN0WrZwNClqcEG9x0~VAvEUzLqTfi5hegv4F9I1kCTpY545Qzh-gYhy7IUBOfLW8Eip3E5Y7c-m0tj4Cmk50KQB1DIAyJXuaF0DaM4pfjA4HBt1SM8-EkudX9ciRXJfJwx-ctTNOD~CCYZ8kCLgq-nV-NEj2xrJ9ijau0npbxA-PKPbq5VifVBGZnw3xfTkKvBjWsdIvkNIg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
          action={() => router.push('/christmas')}
        />
      </CardGrid>
      <CardGrid
        gridColumnGap="l"
        columns="2"
        breakpoints={[{ breakpoint: 'lg', columns: 1 }]}
        px="xxl"
        mt="xxl"
      >
        <MarketingHeadline
          title={
            <>
              <Heading color="neutrals.900" variant="h2" fontWeight="800">
                They're welcome here.
              </Heading>
            </>
          }
          supertitle="Know someone in need?"
          description="Long Hollow is one church that meets in two locations just north of Nashville. We’re a community of believers with something for everyone. Whether you’re checking out Christ for the first time or are looking for a place to call home, you’re invited to discover your purpose and live it out at Long Hollow."
          actions={[
            {
              color: 'primary',
              label: 'Primary Call',
            },
            {
              color: 'secondary',
              label: 'Secondary Call',
            },
          ]}
        />
        <SarahQuote />
      </CardGrid>
      <Box
        background={`linear-gradient(to bottom right, ${theme.colors.gradient.join(
          ', '
        )})`}
        height="434px"
        minWidth={`${theme.breakpoints.lg}`}
        width="100%"
        mt="xl"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Box display="flex" alignItems="flex-end" mb="s" mt="l">
          <Icon
            name="godLoves"
            width="532px"
            height="67px"
            viewBox="0 0 532 67"
            stroke="white"
            fill="white"
            mr="m"
          />
          <Icon
            name="you"
            width="200px"
            height="67px"
            viewBox="0 0 200 67"
            stroke="white"
          />
          <Circle color="white" size={20} weight="fill" />
        </Box>
        <Text
          color="white"
          variant="h4"
          width="530px"
          textAlign="center"
          display="inline"
          fontWeight="600"
          mb="s"
        >
          For God so loved the world, that he gave his only Son, that whoever
          believes in him should not perish but have eternal life.&nbsp;
          <Text
            color="neutrals.100"
            variant="h4"
            opacity="60%"
            display="inline"
            fontWeight="600"
          >
            John 3.16
          </Text>
        </Text>
        <Text
          color="neutrals.100"
          opacity="60%"
          display="flex"
          fontWeight="600"
          alignItems="center"
        >
          The good news&nbsp;
          <ArrowRight
            size="18"
            color={`${theme.colors.neutrals[100]}`}
            opacity="60%"
            weight="bold"
          />
        </Text>
      </Box>
      <ConnectTiles />
    </>
  );
}

function LoggedOutHomeFeed(props = {}) {
  const router = useRouter();

  return (
    <>
      <CardGrid
        gridColumnGap="l"
        columns="2"
        breakpoints={[{ breakpoint: 'lg', columns: 1 }]}
        px="xxl"
        my="xxl"
      >
        <MarketingHeadline
          title={
            <>
              <Heading color="neutrals.900" variant="h2" fontWeight="800">
                You're welcome here.
              </Heading>
            </>
          }
          supertitle="We'd like to know you"
          description="Long Hollow is one church that meets in two locations just north of Nashville. We’re a community of believers with something for everyone. Whether you’re checking out Christ for the first time or are looking for a place to call home, you’re invited to discover your purpose and live it out at Long Hollow."
          actions={[
            {
              color: 'primary',
              label: 'Primary Call',
            },
            {
              color: 'quaternary',
              label: 'Secondary Call',
              variant: 'outlined',
            },
          ]}
        />
        <SarahQuote />
      </CardGrid>
      <CardGrid
        gridColumnGap="l"
        columns="2"
        breakpoints={[{ breakpoint: 'lg', columns: 1 }]}
        px="xxl"
        mt="xxl"
      >
        <LargeImage
          text="Celebrate the Hope of Christ with us."
          color="white"
          src="https://s3-alpha-sig.figma.com/img/819d/924a/5b523972e95961c459d926736ea2f611?Expires=1612742400&Signature=KRqft30qRfZq4MpUq27xME4hIEj4gFYr4s~lXEFpUwlDGfVCXfUsCu~JNXBicN9MnQYNW84z84g6RwRkDxQsrYlRGGeE~0wBdHAbSEWx~lZIG9k7JK8iCoVEWSsryT-xrQY-o4rO7AaN0WrZwNClqcEG9x0~VAvEUzLqTfi5hegv4F9I1kCTpY545Qzh-gYhy7IUBOfLW8Eip3E5Y7c-m0tj4Cmk50KQB1DIAyJXuaF0DaM4pfjA4HBt1SM8-EkudX9ciRXJfJwx-ctTNOD~CCYZ8kCLgq-nV-NEj2xrJ9ijau0npbxA-PKPbq5VifVBGZnw3xfTkKvBjWsdIvkNIg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
          action={() => router.push('/christmas')}
        />
        <Box>
          <ArticleLink
            title="Lorem ipsum doler sit itmut this is a title of this story article or news something or thing."
            url="/"
            urlText="Learn more"
            imageSrc="https://s3-alpha-sig.figma.com/img/d222/5e20/7026f0d2db6b662bd925005ed3d78375?Expires=1612742400&Signature=gAWCBTp4D7KbI8TALUxCNMI21NhB08Mu5O-BaA~wM5CMp6jlRdy-Q52YMSGw6vZ60EilqDTbxyJ1INP4xrgD5MbdMprqR6D1xu7dbpeZnu72yavDCj26VaShkz62FAM8Y6cPUDzhGJKTxM40EgElerZ0qsFEIuSTNl9y40ZeJWiXa2WwKBKgb2dGmSw5WCVTsARUCYJ1iXiGsOsbY57SZL5m1xVZxFJnl28ioFHOFTmKqvcjpk-xPuk287igAOGSOVEm5psTZ71hjrv9AUGf-s8RrQiDd1ZzcrF1y5Ul6oBQYmBxuhjkCjK2u4RFUcGhOqMokzja4TqpyxCj6rB1SQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            mb="s"
          />
          <ArticleLink
            title="Lorem ipsum doler sit itmut this is a title of this story article or news something or thing."
            url="/"
            urlText="Learn more"
            imageSrc="https://s3-alpha-sig.figma.com/img/d503/cf1e/51e2f4afe7a9d1befea1d404776bce58?Expires=1612742400&Signature=CRak1QZFV30oWYfOmofyDhPZYYUSuYLx5PM7veQNCK-J6VdCBLLnh8eNG-gzZHSVnxHkr0W-DVRrRtvGBahERez2kJ~HCg1IQSsXl73m1yvGvBDoXNLHXly67ZJlfHxcKKgYk5iw1uwU3ditcGV1vxpiVdFFBIECr58qlnIbSRmrgWqHBZtWsC16IIuNt68NW~43iIcWUMmqxtM3~EsLRm8XyPqylh37St-e2KNBa22gDFhz2kz5uub7iYR5nZLiYXOoMYI0FeRXXNV0Oj~79pyGCOOi5-xVIRaqlFQhIKrV0I0oO~D2ZDXo2QdXWdqH9Ek6QKG3RlhIzE2ayQQ-Xg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
          />
        </Box>
      </CardGrid>
      <FullWidthCTA height="434px" pt="171px">
        <Box display="flex" alignItems="flex-end" mb="s" mt="l">
          <Icon
            name="godLoves"
            width="532px"
            height="67px"
            viewBox="0 0 532 67"
            stroke="white"
            fill="white"
            mr="m"
          />
          <Icon
            name="you"
            width="200px"
            height="67px"
            viewBox="0 0 200 67"
            stroke="white"
          />
          <Circle color="white" size={20} weight="fill" />
        </Box>
        <Text
          color="white"
          variant="h4"
          width="530px"
          textAlign="center"
          display="inline"
          fontWeight="600"
          mb="s"
        >
          For God so loved the world, that he gave his only Son, that whoever
          believes in him should not perish but have eternal life.&nbsp;
          <Text
            color="neutrals.100"
            variant="h4"
            opacity="60%"
            display="inline"
            fontWeight="600"
          >
            John 3.16
          </Text>
        </Text>
        <Text
          color="neutrals.100"
          opacity="60%"
          display="flex"
          fontWeight="600"
          alignItems="center"
        >
          The good news&nbsp;
          <ArrowRight
            size="18"
            color={`${theme.colors.neutrals[100]}`}
            opacity="60%"
            weight="bold"
          />
        </Text>
      </FullWidthCTA>
      <ConnectTiles />
    </>
  );
}

function HomeFeed(props = {}) {
  const loggedIn = false;
  const fullSermon = loggedIn && true;
  return (
    <>
      {fullSermon ? <FullLengthSermon /> : <DefaultMainPhotoHeader />}
      {loggedIn ? <LoggedInHomeFeed /> : <LoggedOutHomeFeed />}
    </>
  );
}

export default HomeFeed;
