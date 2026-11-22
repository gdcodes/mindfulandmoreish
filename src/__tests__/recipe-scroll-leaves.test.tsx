import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@emotion/react';
import { colors } from '../theme/colors';
import RecipeScrollLeaves from '../components/RecipeScrollLeaves';

describe('RecipeScrollLeaves', () => {
  it('renders decorative scroll leaves hidden from assistive technology', () => {
    const { container } = render(
      <ThemeProvider theme={{ colors }}>
        <RecipeScrollLeaves />
      </ThemeProvider>
    );

    const overlay = container.querySelector('[data-test-id="recipe-scroll-leaves"]');

    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveAttribute('aria-hidden', 'true');
  });
});
