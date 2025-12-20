import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';

export const VERIFY_PIN = gql`
  mutation verifyPin($phone: String!, $code: String!) {
    authenticateWithSms(phoneNumber: $phone, pin: $code) {
      token
    }
  }
`;

function useVerifyPin(options = {}) {
  return useMutation(VERIFY_PIN, options);
}

export default useVerifyPin;
