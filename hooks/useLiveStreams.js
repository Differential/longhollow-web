import { gql, useQuery } from '@apollo/client';
import { formatDistanceToNow } from 'date-fns';

export const GET_LIVE_STREAMS = gql`
  query getLiveStreams {
    liveStreams {
      isLive
      eventStartTime
      media {
        name
        embedHtml
        sources {
          uri
        }
      }
      webViewUrl
      contentItem {
        id
        ... on WeekendContentItem {
          title
          summary
          coverImage {
            sources {
              uri
            }
          }
          parentItem {
            id
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
`;

function useLiveStreams(options = {}) {
  const query = useQuery(GET_LIVE_STREAMS, options);
  const firstStream = query?.data?.liveStreams?.[0];
  let prettyCountdown;
  if (firstStream?.isLive) prettyCountdown = '• LIVE NOW';
  else if (!firstStream?.eventStartTime) prettyCountdown = '';
  else
    prettyCountdown = `• LIVE ${formatDistanceToNow(
      new Date(firstStream?.eventStartTime),
      { addSuffix: true }
    ).toUpperCase()}`;

  return {
    prettyCountdown,
    liveStreams: query?.data?.liveStreams || [],
    ...query,
  };
}

export default useLiveStreams;
