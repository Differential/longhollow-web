import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

export const GET_STAFF = gql`
  query getStaff($ministry: String!) {
    getStaff(ministry: $ministry) {
      id
      firstName
      lastName
      photo {
        uri
      }
      position
      campus {
        name
      }
    }
  }
`;

function useStaff(options = {}) {
  const query = useQuery(GET_STAFF, options);

  return {
    staff: query?.data?.edges || [],
    ...query,
  };
}

export default useStaff;
