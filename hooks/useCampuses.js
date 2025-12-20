import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

export const GET_CAMPUSES = gql`
  query {
    campuses {
      id
      name
    }
  }
`;

function useCampuses(options) {
  const query = useQuery(GET_CAMPUSES, options);

  return {
    campuses: query?.data?.campuses || [],
    ...query,
  };
}

export default useCampuses;
