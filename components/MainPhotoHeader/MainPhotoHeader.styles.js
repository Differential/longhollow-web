import { themeGet } from '@styled-system/theme-get';
import styled, { css } from 'styled-components';

import { Box, Image, system } from 'ui-kit';

const Styled = {};

Styled.Container = styled(Box)`
  position: relative;
  text-align: center;
  width: 100%;

  ${system}
`;

Styled.Backdrop = styled(Box)`
  display: none;

  @media screen and (min-width: ${themeGet('breakpoints.lg')}) {
    background-image: url(${props => props.src});
    background-size: cover;
    display: block;
    height: calc(100vw * 0.5625);
    margin-left: -5px;
    width: calc(100% + 10px);
  }

  @media screen and (min-width: ${themeGet('breakpoints.xl')}) {
    height: calc(${themeGet('space.content')} * 0.5625);
  }

  ${system}
`;

Styled.ImageContainer = styled(Box)`
  margin: 0 auto;
  width: 100%;

  ${props =>
    props.backdrop
      ? css`
          @media screen and (min-width: ${themeGet('breakpoints.lg')}) {
            height: calc(100vw * 0.5625);
            left: 50%;
            position: absolute;
            top: 0;
            transform: translate(-50%, 0);
            filter: drop-shadow(0px 20px 48px rgba(0, 0, 0, 0.25));
          }

          @media screen and (min-width: ${themeGet('breakpoints.xl')}) {
            height: calc(${themeGet('space.content')} * 0.5625);
            padding-top: ${themeGet('space.l')};
            width: ${themeGet('space.content')};
          }
        `
      : css`
          height: auto;
        `}

  ${system}
`;

Styled.Image = styled(Image)`
  object-fit: ${props => props.objectFit || 'cover'};
  width: 100%;

  ${props =>
    props.backdrop
      ? css`
          height: calc(100vw * 0.5625);

          @media screen and (min-width: ${themeGet('breakpoints.xl')}) {
            border-radius: ${themeGet('radii.image')};
            height: calc(${themeGet('space.content')} * 0.5625);
          }
        `
      : css`
          height: auto;
        `}

  ${system}
`;

Styled.BackdropOverlay = styled(Box)`
  display: none;

  @media screen and (min-width: ${themeGet('breakpoints.xl')}) {
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    opacity: 1;
    backdrop-filter: blur(25px);
    background-color: rgba(255, 255, 255, 0.33);
  }
`;

Styled.ImageOverlay = styled(Box)`
  display: none;

  @media screen and (min-width: ${themeGet('breakpoints.lg')}) {
    display: block;
    height: calc(100vw * 0.5625);
    left: 0;
    margin: 0 auto;
    position: absolute;
    top: 0;
    width: 100%;
  }

  ${props =>
    props.backdrop
      ? css`
          @media screen and (min-width: ${themeGet('breakpoints.xl')}) {
            border-radius: ${themeGet('radii.image')};
            height: calc(${themeGet('space.content')} * 0.5625);
            margin-top: ${themeGet('space.l')};
            width: ${themeGet('space.content')};
          }
        `
      : null}

  ${system}
`;

Styled.TextContainer = styled(Box)`
  flex-direction: column;
  margin: ${themeGet('space.l')};
  z-index: 1;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);

  @media screen and (min-width: ${themeGet('breakpoints.md')}) {
    bottom: unset;
    height: auto;
    left: 0;
    margin: ${themeGet('space.l')} ${themeGet('space.xxl')};
    max-width: unset;
    position: relative;
  }

  @media screen and (min-width: ${themeGet('breakpoints.lg')}) {
    margin: 0;
    padding: 0 ${themeGet('space.xxl')};
    height: 100%;
    max-width: ${themeGet('space.content')};
    width: 100%;
  }

  ${system}
`;

Styled.TextPosition = styled(Box)`
  @media screen and (min-width: ${themeGet('breakpoints.lg')}) {
    pointer-events: none;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    bottom: 0;
    width: 100%;
  }
`;

export default Styled;
