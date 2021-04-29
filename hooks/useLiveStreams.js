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
    }
  }
`;

function useLiveStreams(options = {}) {
  const query = useQuery(GET_LIVE_STREAMS, options);
  const firstStream = query?.data?.liveStreams?.[0];

  return {
    prettyCountdown: firstStream?.isLive
      ? '• LIVE NOW'
      : `• LIVE IN ${formatDistanceToNow(
          new Date(firstStream?.eventStartTime),
          { addSuffix: true }
        ).toUpperCase()}`,
    liveStreams: query?.data?.liveStreams || [],
    ...query,
  };
}

export default useLiveStreams;
