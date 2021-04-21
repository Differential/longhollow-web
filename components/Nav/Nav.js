import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import { Box, Heading, systemPropTypes } from 'ui-kit';
import { ClientSideComponent, Dropdowns } from 'components';
import Styled from './Nav.styles';
import { useModalDispatch } from 'providers/ModalProvider';
import { useCurrentUser } from 'hooks';
import { useTheme } from 'styled-components';

function getMenuItem(menuItem) {
  switch (menuItem) {
    case 'about':
      return Dropdowns.About;
    case 'next-steps':
      return Dropdowns.NextSteps;
    case 'connect':
      return Dropdowns.Connect;
    case 'search':
      return Dropdowns.Search;
    case 'user':
      return Dropdowns.User;
    default:
      return null;
  }
}

function Nav(props = {}) {
  const router = useRouter();
  const theme = useTheme();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const modalDispatch = useModalDispatch();
  const { authenticated } = useCurrentUser();

  return (
    <Styled.Nav active={props.active}>
      <ClientSideComponent height="100%" width="100%">
        <Styled.QuickActions active={props.active}>
          {props.data.quickActions.map((action, i) => {
            const Component = getMenuItem(action.id);
            return (
              <Box
                key={action.action}
                // Don't show hover state on mobile
                onTouchEnd={() => {
                  setHoveredItem(null);
                  setIsMobile(true);
                }}
                onMouseEnter={() => {
                  // TODO: Need to disable this for touch devices
                  if (action.id === hoveredItem || isMobile) {
                    setHoveredItem(null);
                  } else {
                    setHoveredItem(action.id);
                  }
                }}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <QuickAction
                  data={action}
                  callData={props.callData}
                  id={action.id}
                  selected={action.action === router.pathname}
                  hovered={action.id === hoveredItem}
                  onClick={() => {
                    setHoveredItem(null);
                    const webAction = action.action?.web;

                    if (typeof webAction === 'string') {
                      router.push(webAction);
                    } else {
                      webAction?.({
                        modalDispatch,
                        router,
                        authenticated,
                      });
                    }
                  }}
                  onTouchEnd={() => {
                    setHoveredItem(null);
                    const mobileAction = action.action?.mobile;

                    if (typeof mobileAction === 'string') {
                      router.push(mobileAction);
                    } else {
                      mobileAction?.({
                        modalDispatch,
                        router,
                        authenticated,
                      });
                    }
                  }}
                />
                {Component && (
                  <Box
                    display={{
                      _: 'none',
                      lg: action.id === hoveredItem ? 'block' : 'none',
                    }}
                    position="absolute"
                    top={theme.space.header}
                    right="0"
                    left="0"
                    zIndex="999"
                  >
                    <Component />
                  </Box>
                )}
              </Box>
            );
          })}
        </Styled.QuickActions>
      </ClientSideComponent>
    </Styled.Nav>
  );
}

function QuickAction(props = {}) {
  let content = props.data.call;
  if (typeof content === 'function') {
    content = content(props.callData);
  }
  const hasDropdown = getMenuItem(props.id);

  return (
    <Styled.QuickAction
      hovered={props.hovered}
      selected={props.selected}
      onClick={props.onClick}
      onTouchEnd={props.onTouchEnd}
      hasDropdown={hasDropdown}
    >
      <Heading variant="base" color="fg">
        {content}
      </Heading>
    </Styled.QuickAction>
  );
}

Nav.propTypes = {
  ...systemPropTypes,
  data: PropTypes.object,
  callData: PropTypes.object,
  active: PropTypes.bool,
};

export default Nav;
