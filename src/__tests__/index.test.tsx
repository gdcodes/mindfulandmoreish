import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@emotion/react';
import { colors } from '../theme/colors';
import IndexPage from '../pages/index';

// Mock Gatsby's graphql and useStaticQuery to avoid hitting actual data layer
jest.mock('gatsby', () => ({
  ...jest.requireActual('gatsby'),
  graphql: jest.fn(),
  useStaticQuery: jest.fn(() => ({
    site: { siteMetadata: { title: 'Site', description: '', author: '' } },
  })),
}));

describe('IndexPage', () => {
  it('shows sort select with Newest First option', () => {
    const mockData = { 
      allContentfulRecipe: { 
        nodes: [] 
      } 
    };
    
    // Create a mock page props object with required properties
    const mockPageProps = {
      data: mockData,
      location: { pathname: '/' },
      path: '/',
      uri: '/',
      pageContext: {},
      params: {},
      // @ts-ignore - We don't need the full implementation for testing
      pageResources: {},
    };
    
    render(
      <ThemeProvider theme={{ colors }}>
        {/* @ts-ignore - We're testing a simplified case */}
        <IndexPage {...mockPageProps} />
      </ThemeProvider>
    );
    
    expect(screen.getByRole('combobox')).toHaveValue('newest');
    expect(screen.getByText('Newest First')).toBeInTheDocument();
  });
});