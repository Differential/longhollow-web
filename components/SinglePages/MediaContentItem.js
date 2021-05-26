import { Layout, MainPhotoHeader } from 'components';
import { useRouter } from 'next/router';
import VideoPlayer from 'components/VideoPlayer/VideoJSPlayer';
import { Heading, Section, Longform } from 'ui-kit';
import { getMetaData, getSlugFromURL } from 'utils';
import { useState } from 'react';

export default function WeekendContentItem({ item, dropdownData } = {}) {
  const [selectedClip, setSelectedClip] = useState(0);

  const router = useRouter();
  if (router.isFallback) {
    return null;
  }

  const clips = item?.childContentItemsConnection?.edges || [];

  let src = item.videos?.filter(({ sources }) => sources.length)[0]?.sources[0]
    .uri;

  if (!src) {
    src = item.audios?.filter(({ sources }) => sources.length)[0]?.sources[0]
      .uri;
  }

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
                pl={{ _: '0', lg: '300px' }}
              >
                {clips?.length ? (
                  <Carousel
                    display={{ _: 'none', lg: 'inherit' }}
                    width="100%"
                    neighbors="3d"
                    contentWidth={{ _: '100vw', lg: '681px' }}
                    pl={{ _: '0', lg: '300px' }}
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
                ) : (
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
                )}
              </Box>
            )
          }
        />
        {clips?.length ? (
          <Box
            flexDirection="column"
            mx={{ _: 'l', md: 'xxl' }}
            mt={{ _: 'm', lg: '-130px' }}
            zIndex="2"
          >
            <Heading variant="h5" color="neutrals.500">
              FULL MESSAGE
            </Heading>
            <Styled.SermonContainer mt="s">
              <Styled.SermonImage
                rounded
                src={item.coverImage?.sources?.[0]?.uri}
                onClick={() => router.push(`/${getSlugFromURL(item.sharing?.url)}`)}
              />
              <Box position="absolute" right="10px" bottom="10px">
                <PlayCircle
                  size="36"
                  color={`${theme.colors.neutrals[100]}`}
                  opacity="60%"
                />
              </Box>
            </Styled.SermonContainer>
          </Box>
        ) : null}
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




  return (
      <Section mb="xl" py={'l'}>
        <Heading variant="h2" fontWeight="800" mb="m">
          {item.title}
        </Heading>
        <Heading variant="h4" fontWeight="500" mb="m">
          {item.summary}
        </Heading>
      </Section>
    </Layout>
  );

}
