import { gql } from '@apollo/client';

import { useAuthQuery } from './';

export const GET_CURRENT_PERSON = gql`
  query {
    currentUser {
      id
      profile {
        id
        firstName
        lastName
        email
        phoneNumber
        gender
        ethnicity
        birthDate
        communicationPreferences {
          allowPushNotification
          allowSMS
          allowEmail
        }
        campus {
          id
          featuredImage {
            uri
          }
          name
        }
        photo {
          uri
        }
        address {
          street1
          city
          state
          postalCode
        }
      }
    }
  }
`;

function useCurrentPerson(options = {}) {
  const query = useAuthQuery(GET_CURRENT_PERSON, options);

  return {
    currentPerson: query?.data?.currentUser || [],
    ...query,
  };
}

export default useCurrentPerson;
