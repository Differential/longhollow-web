import React from 'react';

import { getAge } from 'utils';
import { useAuthIdentity, useForm } from 'hooks';
import { Box, Button, TextInput } from 'ui-kit';
import { BirthDateField, GenderField } from 'components';
import { useAuth, update as updateAuth } from 'providers/AuthProvider';
import { upperFirst } from 'lodash';

function AuthDetails() {
  const {
    error,
    setError,
    status,
    setStatus,
    handleAuthIdentity,
  } = useAuthIdentity();
  const [_, dispatch] = useAuth();
  const { values, handleSubmit, handleChange } = useForm(() => {
    const age = getAge(values.birthDate);
    // Make sure they are at least 13 years of age.
    if (age < 13) {
      setError({
        birthdate: 'You must be at least 13.',
      });
    }
    if (!error) {
      dispatch(
        updateAuth({
          profile: {
            ...values,
            birthDate: new Date(values.birthDate),
            gender: upperFirst(values.gender),
          },
        })
      );
      setStatus('LOADING');
      handleAuthIdentity({ nextStep: 2 });
    }
  });

  const isLoading = status === 'LOADING';

  return (
    <>
      <Box as="p" color="subdued" mb="l">
        Help us learn a little more about you so we can connect you with the
        best ministries and events.
      </Box>
      <Box as="form" action="" onSubmit={handleSubmit} px={{ _: 0, lg: 'xl' }}>
        <Box
          display="grid"
          gridTemplateColumns={{ _: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
          gridColumnGap="base"
          gridRowGap="base"
          mb="base"
        >
          <Box>
            <TextInput
              id="firstName"
              label="First Name"
              fontSize="s"
              onChange={handleChange}
              required
              autoFocus
            />
            {error?.firstName ? (
              <Box as="p" color="alert" fontSize="s" mt="s">
                {error.firstName}
              </Box>
            ) : null}
          </Box>
          <Box>
            <TextInput
              id="lastName"
              label="Last Name"
              fontSize="s"
              onChange={handleChange}
              required
            />
            {error?.lastName ? (
              <Box as="p" color="alert" fontSize="s" mt="s">
                {error.lastName}
              </Box>
            ) : null}
          </Box>
        </Box>
        <Box
          display="grid"
          gridTemplateColumns={{ _: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
          gridColumnGap="base"
          gridRowGap="base"
          mb="l"
        >
          <Box>
            <BirthDateField onChange={handleChange} error={error?.birthdate} />
          </Box>
          <Box>
            <GenderField onChange={handleChange} initialValue={values.gender} />
          </Box>
        </Box>
        <Box textAlign="center">
          <Button type="submit" status={status} mb="base">
            Finish{isLoading ? 'ing...' : ''}
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default AuthDetails;
