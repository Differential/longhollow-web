import { useRouter } from 'next/router';
import HorizontalRow from './HorizontalRow';

const ConnectTiles = (props) => {
  const router = useRouter();
  return (
    <HorizontalRow
      backgroundColor="neutrals.800"
      py="186px"
      width="100%"
      items={[
        {
          src: '/home/kids.png',
          action: () => router.push('/connect/kids'),
        },
        {
          src: '/home/students.png',
          action: () => router.push('/connect/students'),
        },
        {
          src: '/home/support.png',
          action: () => router.push('/cr-support'),
        },
        {
          src: '/home/groups.png',
          action: () => router.push('/life-groups'),
        },
        {
          src: '/home/watch-parties.png',
          action: () => router.push('/watch'),
        },
        {
          src: '/home/help.png',
          action: () => router.push('/get-give-help'),
        },
      ]}
      {...props}
    />
  );
};

export default ConnectTiles;
