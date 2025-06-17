import React from 'react';
import type { GatsbyBrowser } from 'gatsby';
import { ThemeProvider } from './src/theme/ThemeProvider';
import { Layout } from './src/components/Layout';

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({ element, props }) => {
  return (
    <Layout {...props}>
      {element}
    </Layout>
  );
};

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }) => {
  return (
    <ThemeProvider>
      {element}
    </ThemeProvider>
  );
};