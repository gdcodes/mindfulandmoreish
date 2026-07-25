import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@emotion/react';
import { colors } from '../theme/colors';
import RecipeTemplate from '../templates/recipe';

jest.mock('gatsby', () => ({
  graphql: jest.fn(),
  useStaticQuery: jest.fn(() => ({
    site: { siteMetadata: { title: 'Site', description: '', author: '' } },
  })),
}));

const richTextRaw = (content: unknown[]) => JSON.stringify({
  nodeType: 'document',
  data: {},
  content,
});

const textNode = (value: string) => ({
  nodeType: 'text',
  value,
  marks: [],
  data: {},
});

const paragraph = (value: string) => ({
  nodeType: 'paragraph',
  data: {},
  content: [textNode(value)],
});

describe('RecipeTemplate', () => {
  it('renders recipe rich text with readable paragraph, heading, and list structure', () => {
    const mockPageProps = {
      data: {
        contentfulRecipe: {
          id: 'recipe-readable-text',
          title: 'Long Mobile Friendly Breakfast Bowl',
          slug: 'long-mobile-friendly-breakfast-bowl',
          prepTime: 10,
          cookTime: 5,
          coolTime: 0,
          shelfLife: 0,
          fridgeLife: 2,
          freezerLife: 0,
          tags: ['Breakfast'],
          createdAt: new Date(Date.UTC(2026, 0, 1)).toISOString(),
          ingredients: {
            raw: richTextRaw([
              paragraph('One generous handful of oats, berries, seeds and yoghurt'),
            ]),
          },
          instructions: {
            raw: richTextRaw([
              {
                nodeType: 'heading-3',
                data: {},
                content: [textNode('Before you start')],
              },
              paragraph('Let the mixture rest so the texture turns creamy instead of dense.'),
              {
                nodeType: 'ordered-list',
                data: {},
                content: [
                  {
                    nodeType: 'list-item',
                    data: {},
                    content: [paragraph('Stir gently, then spoon into a bowl and finish with fruit.')],
                  },
                ],
              },
            ]),
          },
        },
      },
      location: { pathname: '/recipe/long-mobile-friendly-breakfast-bowl/' },
      path: '/recipe/long-mobile-friendly-breakfast-bowl/',
      uri: '/recipe/long-mobile-friendly-breakfast-bowl/',
      pageContext: {},
      params: {},
      pageResources: {},
    };

    render(
      <ThemeProvider theme={{ colors }}>
        {/* @ts-ignore - We only need the recipe data required by this template. */}
        <RecipeTemplate {...mockPageProps} />
      </ThemeProvider>
    );

    expect(screen.getByRole('heading', { name: 'Long Mobile Friendly Breakfast Bowl', level: 1 })).toBeInTheDocument();
    expect(screen.getByText('Before you start').tagName).toBe('H3');
    expect(screen.getByText('Let the mixture rest so the texture turns creamy instead of dense.').closest('p')).toBeInTheDocument();
    expect(screen.getByText('Stir gently, then spoon into a bowl and finish with fruit.').closest('li')).toBeInTheDocument();
  });
});
