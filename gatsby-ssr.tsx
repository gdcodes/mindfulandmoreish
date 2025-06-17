import React from 'react';
import type { GatsbySSR } from 'gatsby';
import { ThemeProvider } from './src/theme/ThemeProvider';
import { Layout } from './src/components/Layout';

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({ element, props }) => {
  return (
    <Layout {...props}>
      {element}
    </Layout>
  );
};

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => {
  return (
    <ThemeProvider>
      {element}
    </ThemeProvider>
  );
};