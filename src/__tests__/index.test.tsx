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

  it('shows zero-day shelf and fridge life on recipe cards', () => {
    const mockData = {
      allContentfulRecipe: {
        nodes: [
          {
            id: 'recipe-zero-life',
            title: 'Zero Life Recipe',
            slug: 'zero-life-recipe',
            prepTime: 10,
            cookTime: 15,
            coolTime: 0,
            shelfLife: 0,
            fridgeLife: 0,
            freezerLife: 0,
            tags: ['Dinner'],
            createdAt: new Date(Date.UTC(2026, 0, 1)).toISOString(),
          },
        ],
      },
    };

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

    expect(screen.getByText('Shelf: 0 days')).toBeInTheDocument();
    expect(screen.getByText('Fridge: 0 days')).toBeInTheDocument();
  });
});
