import { Carousel, Layout, MainPhotoHeader } from 'components';
import { useRouter } from 'next/router';
import VideoPlayer from 'components/VideoPlayer/VideoJSPlayer';
import { Heading, Section, Longform, Box, Text } from 'ui-kit';
import { getMetaData, getSlugFromURL } from 'utils';
import { useState } from 'react';
import { PlayCircle } from 'phosphor-react';
import { useTheme } from 'styled-components';
import Styled from 'components/HomeFeed/HomeFeed.styles';

export default function WeekendContentItem({ item, dropdownData } = {}) {
  const clips = item?.childContentItemsConnection?.edges || [];

  const [selectedClip, setSelectedClip] = useState(0);
  const [showing, setShowing] = useState({
    clips: clips?.length > 0,
    full: !(clips?.length > 0),
  });

  const theme = useTheme();
  const router = useRouter();
  if (router.isFallback) {
    return null;
  }

  let src = item.videos?.filter(({ sources }) => sources.length)[0]?.sources[0]
    .uri;

  if (!src) {
    src = item.audios?.filter(({ sources }) => sources.length)[0]?.sources[0]
      .uri;
  }
  console.log(clips);

  return (
    <Layout meta={getMetaData(item)} dropdownData={dropdownData}>
      <Box display="flex" flexDirection="column">
        <MainPhotoHeader
          src={item.coverImage?.sources?.[0]?.uri}
          showImage={false}
          overlay=""
          content={
            !!(
              (clips.length &&
                clips.some(clip => clip?.node?.videos?.length)) ||
              item.videos?.[0]?.sources?.[0]?.uri
            ) && (
              <Box
                position={{ lg: 'absolute' }}
                top="0"
                alignItems="center"
                justifyContent="center"
                background="linear-gradient(89.49deg, #1C1617 -16.61%, rgba(28, 22, 23, 0) 99.62%);"
                height="100%"
                width="100%"
                display={'flex'}
              >
                {clips?.length ? (
                  <Styled.SermonSelector>
                    <Text
                      mx="xs"
                      variant="h2"
                      fontWeight={showing?.clips ? 'bold' : 'normal'}
                      onClick={() => setShowing({ clips: true, full: false })}
                    >
                      Clips
                    </Text>
                    <Text
                      mx="xs"
                      variant="h2"
                      fontWeight={showing?.full ? 'bold' : 'normal'}
                      onClick={() => setShowing({ clips: false, full: true })}
                    >
                      Full Message
                    </Text>
                  </Styled.SermonSelector>
                ) : null}
                {clips?.length && showing?.clips ? (
                  <Carousel
                    display={{ _: 'none', lg: 'inherit' }}
                    width="100%"
                    neighbors="3d"
                    contentWidth={{ _: '100vw', lg: '681px' }}
                    onClick={i => setSelectedClip(i)}
                    childProps={i => ({
                      style: {
                        pointerEvents: i !== selectedClip ? 'none' : 'initial',
                        width: '100%',
                      },
                    })}
                  >
                    {clips.map(clip =>
                      clip?.node?.videos?.[0]?.sources?.[0]?.uri || true ? (
                        <VideoPlayer
                          key={clip.node?.id}
                          src={clip.node?.videos?.[0]?.sources?.[0]?.uri}
                          title={clip.node?.title}
                          poster={clip.node?.coverImage?.sources?.[0]?.uri}
                          style={{ width: '681px' }}
                        />
                      ) : null
                    )}
                  </Carousel>
                ) : null}
                {showing?.full ? (
                  <Box
                    width={{ _: '100%', lg: '681px' }}
                    px={{ _: 'l', md: 'xxl', lg: 0 }}
                  >
                    <VideoPlayer
                      key={item.id}
                      src={item.videos?.[0]?.sources?.[0]?.uri}
                      poster={item.coverImage?.sources?.[0]?.uri}
                      style={{ width: '100%' }}
                    />
                  </Box>
                ) : null}
              </Box>
            )
          }
        />
      </Box>
      <Section mb="xl">
        <Heading variant="h2" fontWeight="800" mb="m">
          {item.title}
        </Heading>
        <Heading variant="h4" fontWeight="500" mb="m">
          {item.summary}
        </Heading>
        <Longform dangerouslySetInnerHTML={{ __html: item.htmlContent }} />
      </Section>
    </Layout>
  );
}
