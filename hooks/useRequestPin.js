import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';

export const REQUEST_PIN = gql`
  mutation requestPin($phone: String!) {
    requestSmsLoginPin(phoneNumber: $phone) {
      success
    }
  }
`;

function useRequestPin(options = {}) {
  return useMutation(REQUEST_PIN, options);
}

export default useRequestPin;
