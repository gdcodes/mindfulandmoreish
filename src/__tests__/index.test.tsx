import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
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

const createRecipes = (count: number) =>
  Array.from({ length: count }, (_, index) => {
    const recipeNumber = index + 1;

    return {
      id: `recipe-${recipeNumber}`,
      title: `Recipe ${recipeNumber}`,
      slug: `recipe-${recipeNumber}`,
      prepTime: 10,
      cookTime: 15,
      coolTime: 0,
      shelfLife: 1,
      fridgeLife: 3,
      freezerLife: 0,
      tags: ['Dinner'],
      createdAt: new Date(Date.UTC(2026, 0, recipeNumber)).toISOString(),
    };
  });

const renderIndexPage = (nodes: ReturnType<typeof createRecipes>) => {
  const mockData = {
    allContentfulRecipe: {
      nodes,
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

  return render(
    <ThemeProvider theme={{ colors }}>
      {/* @ts-ignore - We're testing a simplified case */}
      <IndexPage {...mockPageProps} />
    </ThemeProvider>
  );
};

describe('IndexPage', () => {
  it('shows sort select with Newest First option', () => {
    renderIndexPage([]);
    
    expect(screen.getByRole('combobox')).toHaveValue('newest');
    expect(screen.getByText('Newest First')).toBeInTheDocument();
  });

  it('shows the first 12 recipes and paginates the remaining recipes', () => {
    renderIndexPage(createRecipes(13));

    expect(screen.getByTestId('results-summary')).toHaveTextContent('Showing 1-12 of 13 recipes');
    expect(screen.getByText('Recipe 13')).toBeInTheDocument();
    expect(screen.queryByText('Recipe 1')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Page 2' }));

    expect(screen.getByTestId('results-summary')).toHaveTextContent('Showing 13-13 of 13 recipes');
    expect(screen.getByText('Recipe 1')).toBeInTheDocument();
    expect(screen.queryByText('Recipe 13')).not.toBeInTheDocument();
  });

  it('returns to the first page after sorting changes', () => {
    renderIndexPage(createRecipes(13));

    fireEvent.click(screen.getByRole('button', { name: 'Page 2' }));
    expect(screen.getByTestId('results-summary')).toHaveTextContent('Showing 13-13 of 13 recipes');

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'oldest' } });

    expect(screen.getByTestId('results-summary')).toHaveTextContent('Showing 1-12 of 13 recipes');
    expect(screen.getByRole('button', { name: 'Page 1' })).toHaveAttribute('aria-current', 'page');
  });
});
