import { gql } from '@apollo/client';
import { useLazyQuery } from '@apollo/client/react';

export const USER_EXISTS = gql`
  query userExists($identity: String!) {
    userExists(identity: $identity)
  }
`;

function useUserExists(options = {}) {
  return useLazyQuery(USER_EXISTS, options);
}

export default useUserExists;
