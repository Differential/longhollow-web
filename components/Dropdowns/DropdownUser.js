import { Button } from './Dropdowns.styles';
import { useCurrentPerson } from 'hooks';
import { logout, useAuthDispatch } from 'providers/AuthProvider';
import { Box, Heading } from 'ui-kit';
import { useRouter } from 'next/router';
import { showModal, useModalDispatch } from 'providers/ModalProvider';

function Profile() {
  const router = useRouter();
  const dispatch = useAuthDispatch();
  const { currentPerson } = useCurrentPerson();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      width="100%"
      borderTop="1px solid grey"
      pt="xxs"
    >
      <Heading width="100%" p="0.875rem">
        {[
          currentPerson.profile?.firstName,
          currentPerson.profile?.lastName,
        ].join(' ')}
      </Heading>
      <Button
        borderRadius="base"
        width="100%"
        onClick={() => {
          router.push('/profile');
        }}
      >
        Profile
      </Button>
      <Button
        borderRadius="base"
        width="100%"
        onClick={() => {
          router.push('https://my.longhollow.com/MyAccount');
        }}
      >
        Update My Info
      </Button>
      <Button
        borderRadius="base"
        width="100%"
        onClick={() => {
          router.push('https://my.longhollow.com/GivingHistory');
        }}
      >
        Giving History
      </Button>
      <Button
        borderRadius="base"
        width="100%"
        onClick={() => {
          router.push('https://my.longhollow.com/ManageGiving');
        }}
      >
        Giving Schedules
      </Button>
      <Button
        borderRadius="base"
        width="100%"
        onClick={() => {
          router.push('https://my.longhollow.com/page/1091');
        }}
      >
        Communication Preferences
      </Button>
      <Button
        borderRadius="base"
        width="100%"
        onClick={() => dispatch(logout())}
      >
        Log Out
      </Button>
    </Box>
  );
}

function Login() {
  const modalDispatch = useModalDispatch();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      width="100%"
      borderTop="1px solid grey"
      pt="xxs"
    >
      <Button
        borderRadius="base"
        width="100%"
        onClick={() => modalDispatch(showModal('Auth'))}
      >
        Sign In
      </Button>
    </Box>
  );
}

export default function DropdownUser() {
  const router = useRouter();
  const { authenticated } = useCurrentPerson();
  return (
    <Box
      bg="bg"
      p="s"
      alignItems="flex-start"
      boxShadow="base"
      display="flex"
      flexDirection="column"
    >
      <Button
        width="100%"
        borderRadius="base"
        onClick={() => router.push('/give')}
      >
        Give
      </Button>
      <Button
        width="100%"
        borderRadius="base"
        onClick={() => router.push('/groups')}
      >
        Groups
      </Button>
      <Button
        width="100%"
        borderRadius="base"
        onClick={() => router.push('/events')}
      >
        Events
      </Button>
      <Button
        width="100%"
        borderRadius="base"
        onClick={() => router.push('/serve')}
      >
        Serve
      </Button>
      <Button
        borderRadius="base"
        width="100%"
        onClick={() => {
          router.push('/connect-with-us');
        }}
      >
        Talk to Someone
      </Button>
      {authenticated ? <Profile /> : <Login />}
    </Box>
  );
}
