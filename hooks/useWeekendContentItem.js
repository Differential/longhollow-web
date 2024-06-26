import { gql, useQuery } from '@apollo/client';

export const GET_WEEKEND_CONTENT_ITEM = gql`
  query getWeekendContentItem($itemId: ID!) {
    node(id: $itemId) {
      id
      title
      summary
      coverImage {
        sources {
          uri
        }
      }
      videos {
        sources {
          uri
        }
      }
      htmlContent
      childContentItemsConnection {
        edges {
          node {
            id
            ... on ContentItem {
              videos {
                sources {
                  uri
                }
              }
            }
          }
        }
      }
      sharing {
        url
      }
    }
  }
`;

function useWeekendContentItem(options = {}) {
  const query = useQuery(GET_WEEKEND_CONTENT_ITEM, options);

  return {
    item: query?.data?.node,
    ...query,
  };
}

export default useWeekendContentItem;
