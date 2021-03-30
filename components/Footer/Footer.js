import React from 'react';
import { FacebookLogo, InstagramLogo, TwitterLogo } from 'phosphor-react';

import { links } from 'config/metadata';
import { Box, CardGrid, List, systemPropTypes, Text, theme } from 'ui-kit';
import { Logo } from 'components';
import Styled from './Footer.styles';
import IDS from 'config/ids';
import FooterLinks from './FooterLinks';

function Footer(props = {}) {
  return (
    <Styled
      {...props}
    >
      <Styled.Grid
        breakpoints={[{ breakpoint: 'md', columns: 1 }]}
        gridTemplateColumns="270px 1fr"
      >
        <Contact />
        <CardGrid
          breakpoints={[
            { breakpoint: 'lg', columns: 2 },
            { breakpoint: 'md', columns: 1 },
          ]}
          gridTemplateColumns="repeat(4, 1fr)"
          gridColumnGap="l"
        >
          <FooterLinks channelId={IDS.ABOUT_PAGES} baseRoute="/about" title="About" />
          <FooterLinks channelId={IDS.NEXT_STEPS_PAGES} baseRoute="/next-steps" title="Next Steps" />
          <FooterLinks channelId={IDS.CONNECT_PAGES} baseRoute="/connect" title="Connect" />
          <QuickLinks />
        </CardGrid>
      </Styled.Grid>
    </Styled>
  );
}

function Contact() {
  return (
    <Styled.Contact>
      <Box mb="xs">
        <Logo dark />
      </Box>
      <Box display="flex" flexDirection="column">
        <Text variant="h4" color="neutrals.100" opacity="33%">
          Long Hollow Baptist Church
        </Text>
        <Text variant="h5" color="neutrals.100" opacity="60%">
          3031 Long Hollow Pike
        </Text>
        <Text variant="h5" color="neutrals.100" opacity="60%">
          Hendersonville, TN 37075
        </Text>
        <Styled.Link
          href="tel:615-824-4006"
          mb="s"
          fontSize={theme.fontSizes.h5}
          lineHeight={theme.lineHeights.h5}
        >
          (615) 824-4006
        </Styled.Link>
        <Box>
          <FacebookLogo
            size="32"
            color={theme.colors.neutrals[100]}
            style={{ opacity: '60%', marginRight: theme.space.s }}
            weight="fill"
          />
          <TwitterLogo
            size="32"
            color={theme.colors.neutrals[100]}
            style={{ opacity: '60%', marginRight: theme.space.s }}
            weight="fill"
          />
          <InstagramLogo
            size="32"
            color={theme.colors.neutrals[100]}
            style={{ opacity: '60%' }}
            weight="fill"
          />
        </Box>
      </Box>
    </Styled.Contact>
  );
}

function QuickLinks() {
  return (
    <List as="ul" space="xs">
      <Box as="li">
        <Styled.Link
          href={links.watch}
          color={theme.colors.white}
          fontWeight="600"
          opacity="1"
        >
          Watch
        </Styled.Link>
        <Styled.Link
          href={links.search}
          color={theme.colors.white}
          fontWeight="600"
          opacity="1"
        >
          Search
        </Styled.Link>
        <Styled.Link
          href={links.give}
          color={theme.colors.white}
          fontWeight="600"
          opacity="1"
        >
          Give
        </Styled.Link>
        <Styled.Link
          href={links.profile}
          color={theme.colors.white}
          fontWeight="600"
          opacity="1"
        >
          My Profile
        </Styled.Link>
      </Box>
    </List>
  );
}

Footer.propTypes = {
  ...systemPropTypes,
};

export default Footer;
