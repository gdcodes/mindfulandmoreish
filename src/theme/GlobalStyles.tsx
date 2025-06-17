import React from 'react';
import { Global, css, useTheme } from '@emotion/react';
import '@fontsource/merriweather/400.css';
import '@fontsource/merriweather/700.css';

const GlobalStylesComponent: React.FC = () => {
  const theme = useTheme();
  
  return (
    <Global
      styles={css`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          scroll-behavior: smooth;
          height: 100%;
        }

        body {
          font-family: 'Merriweather', serif;
          background-color: ${theme.colors.background};
          color: ${theme.colors.text};
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          height: 100%;
        }

        #___gatsby,
        #gatsby-focus-wrapper {
          height: 100%;
        }

        h1, h2, h3, h4, h5, h6 {
          font-weight: 700;
          color: ${theme.colors.textPrimary};
          font-family: 'Merriweather', serif;
        }

        a {
          color: ${theme.colors.nut};
          text-decoration: none;
          transition: color 0.2s ease-in-out;
          
          &:hover {
            color: ${theme.colors.cta};
          }
        }

        ul, ol {
          list-style: none;
        }

        img {
          max-width: 100%;
          height: auto;
          display: block;
        }
      `}
    />
  );
};

export default GlobalStylesComponent;
