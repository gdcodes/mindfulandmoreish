import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import IndexPage from '../pages/index';
import { ThemeProvider } from 'styled-components';
import { colors } from '../theme/colors';

// Mock Gatsby's graphql and useStaticQuery to avoid hitting actual data layer
jest.mock('gatsby', () => {
  const original = jest.requireActual('gatsby');
  return {
    ...original,
    graphql: jest.fn(),
    useStaticQuery: jest.fn(() => ({
      site: { siteMetadata: { title: 'Site', description: '', author: '' } },
    })),
  };
});

describe('IndexPage', () => {
  it('shows sort select with Newest First option', () => {
    const mockData = { allContentfulRecipe: { nodes: [] } };
    render(
      <ThemeProvider theme={{ colors }}>
        <IndexPage {...{ data: mockData }} />
      </ThemeProvider>
    );
    expect(screen.getByRole('combobox')).toHaveValue('newest');
    expect(screen.getByText('Newest First')).toBeInTheDocument();
  });
});

describe('IndexPage sorting', () => {
  const mockData = {
    allContentfulRecipe: {
      nodes: [
        {
          id: '1',
          title: 'Newest Recipe',
          slug: 'newest-recipe',
          prepTime: 10,
          cookTime: 20,
          coolTime: 5,
          shelfLife: 3,
          createdAt: '2023-01-02T00:00:00.000Z',
          tags: ['new'],
          thumbnail: { gatsbyImageData: {} },
        },
        {
          id: '2',
          title: 'Oldest Recipe',
          slug: 'oldest-recipe',
          prepTime: 15,
          cookTime: 25,
          coolTime: 10,
          shelfLife: 5,
          createdAt: '2023-01-01T00:00:00.000Z',
          tags: ['old'],
          thumbnail: { gatsbyImageData: {} },
        },
        {
          id: '3',
          title: 'Quickest Recipe',
          slug: 'quickest-recipe',
          prepTime: 5,
          cookTime: 10,
          coolTime: 0,
          shelfLife: 2,
          createdAt: '2023-01-03T00:00:00.000Z',
          tags: ['quick'],
          thumbnail: { gatsbyImageData: {} },
        },
        {
          id: '4',
          title: 'Longest Lasting Recipe',
          slug: 'longest-lasting-recipe',
          prepTime: 20,
          cookTime: 30,
          coolTime: 15,
          shelfLife: 10,
          createdAt: '2023-01-04T00:00:00.000Z',
          tags: ['long'],
          thumbnail: { gatsbyImageData: {} },
        },
      ],
    },
  };

  function renderWithTheme() {
    return render(
      <ThemeProvider theme={{ colors }}>
        <IndexPage data={mockData} />
      </ThemeProvider>
    );
  }

  function getRecipeTitles(): string[] {
    // RecipeCard likely renders title as h3
    return screen
      .queryAllByRole('heading', { level: 3 })
      .map(h => h.textContent ?? '');
  }

  it('sorts by newest first by default', () => {
    renderWithTheme();
    expect(getRecipeTitles()).toEqual([
      'Longest Lasting Recipe',
      'Quickest Recipe',
      'Newest Recipe',
      'Oldest Recipe',
    ]);
  });

  it('sorts by oldest first', () => {
    renderWithTheme();
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'oldest' } });
    expect(getRecipeTitles()).toEqual([
      'Oldest Recipe',
      'Newest Recipe',
      'Quickest Recipe',
      'Longest Lasting Recipe',
    ]);
  });

  it('sorts by quickest first', () => {
    renderWithTheme();
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'time' } });
    expect(getRecipeTitles()).toEqual([
      'Quickest Recipe',
      'Newest Recipe',
      'Oldest Recipe',
      'Longest Lasting Recipe',
    ]);
  });

  it('sorts by longest lasting first', () => {
    renderWithTheme();
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'shelf' } });
    expect(getRecipeTitles()).toEqual([
      'Longest Lasting Recipe',
      'Oldest Recipe',
      'Newest Recipe',
      'Quickest Recipe',
    ]);
  });
}); 