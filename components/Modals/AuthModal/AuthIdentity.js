import React from 'react';

import { validateEmail, validatePhoneNumber } from 'utils';
import { useAuthIdentity, useForm, useUserExists } from 'hooks';
import { Box, Button, Checkbox, TextInput } from 'ui-kit';

function AuthIdentity() {
  const {
    status,
    setStatus,
    error,
    setError,
    handleAuthIdentity,
  } = useAuthIdentity();
  const identityRef = React.useRef('');
  const [checkIfUserExists] = useUserExists({
    fetchPolicy: 'network-only',
    onCompleted: async data => {
      const identity = identityRef.current;
      const userExists = data?.userExists !== 'NONE';
      handleAuthIdentity({
        identity,
        userExists,
        nextStep: userExists ? 2 : 1,
      });
    },
  });
  const { values, handleSubmit, handleChange } = useForm(formValues => {
    const identity = formValues.identity;
    const validEmail = validateEmail(identity);
    const validPhoneNumber = validatePhoneNumber(identity);
    const validIdentity = validEmail || validPhoneNumber;
    if (validIdentity) {
      setStatus('LOADING');
      identityRef.current = identity;
      checkIfUserExists({ variables: { identity } });
    } else {
      setStatus('ERROR');
      setError({ identity: 'That is not a valid email or phone number.' });
    }
  });

  const isLoading = status === 'LOADING';

  return (
    <>
      <Box as="p" color="subdued" mb="l">
        Enter your phone number or email address to get started. We'll never
        share your information or contact you (unless you ask!).
      </Box>
      <Box as="form" action="" onSubmit={handleSubmit} px={{ _: 0, lg: 'xl' }}>
        <Box mb="base">
          <TextInput
            id="identity"
            label="Mobile Number or Email"
            onChange={handleChange}
            fontSize="s"
            required
            autoFocus
          />
          {error?.identity ? (
            <Box as="p" color="alert" fontSize="s" mt="s">
              {error.identity}
            </Box>
          ) : null}
        </Box>
        <Box mb="l">
          <Checkbox
            id="agreement"
            label="I agree to the Terms of Use and Privacy Policy laid out by Long Hollow Church."
            required
            onChange={handleChange}
            mr="s"
          />
        </Box>
        <Box textAlign="center">
          <Button type="submit" status={status}>
            {isLoading ? 'Loading...' : 'Agree and continue'}
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default AuthIdentity;
