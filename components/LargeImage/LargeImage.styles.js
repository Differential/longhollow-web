import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import { Box, Image, system } from 'ui-kit';

export const StyledImage = styled(Image)`
  height: auto;
  object-fit: cover;
  width: 100%;
  flex: 1;

  @media screen and (max-width: ${themeGet('breakpoints.md')}) {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  @media screen and (min-width: ${themeGet('breakpoints.md')}) {
    height: 100%;
  }

  ${props =>
    props.dropShadow
      ? 'filter: drop-shadow(0px 20px 48px rgba(0, 0, 0, 0.25));'
      : ''}

  ${system}
`;

export const TextContainer = styled(Box)`
  border-radius: 0 0 24px 24px;
  background: rgba(0, 0, 0, 0.5);
  flex: 1;


  @media screen and (max-width: ${themeGet('breakpoints.md')}) {
    ${props => !props.staticHeight ? `backdrop-filter: blur(24px);` : '' }
  }

  @media screen and (min-width: ${props => props.staticHeight ? 0 : themeGet('breakpoints.md')}) {
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 24.48%, rgba(0, 0, 0, 0.75) 100%);
  }
  ${system}
`;

export default styled(Box)`
  position: relative;
  border-radius: 24px;
  overflow: hidden;

  cursor: ${props => (props.onClick ? 'pointer' : 'default')};

  ${props =>
    props.backgroundSrc ? `background: url("${props.backgroundSrc}") no-repeat bottom center;` : ''
  }

  background-size: contain;

  ${props =>
    props.height ? `
      display: flex;
      flex-direction: column;
    ` : ''
  }

  ${system}
`;
