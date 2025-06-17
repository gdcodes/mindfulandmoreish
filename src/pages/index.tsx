import React, { useState, useMemo } from 'react';
import styled from '@emotion/styled';
import { graphql, PageProps } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { RecipeCard } from '../components/RecipeCard';
import { Seo } from '../components/Seo';
import { ContentfulRecipe } from '../types';

const SearchAndSortContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.gray.medium};
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  max-width: 300px;
`;

const SortSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.gray.medium};
  border-radius: 4px;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.colors.white};
`;

const RecipeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

type SortOption = 'newest' | 'oldest' | 'time' | 'shelf' | 'fridge' | 'freezer';

interface IndexQueryData {
  allContentfulRecipe: {
    nodes: {
      id: string;
      title: string;
      slug: string;
      prepTime: number;
      cookTime: number;
      coolTime?: number;
      shelfLife?: number;
      fridgeLife?: number;
      freezerLife?: number;
      tags: string[];
      createdAt: string;
      thumbnail?: {
        gatsbyImageData: IGatsbyImageData;
      };
    }[];
  };
}

interface IndexPageProps extends PageProps<IndexQueryData> {}

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const recipes = data.allContentfulRecipe.nodes as ContentfulRecipe[];
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOption>('newest');

  const filteredAndSortedRecipes = useMemo(() => {
    let result = [...recipes];

    if (searchTerm) {
      result = result.filter(
        recipe =>
          recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    switch (sortOrder) {
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'time':
        result.sort((a, b) => (a.prepTime + a.cookTime + (a.coolTime || 0)) - (b.prepTime + b.cookTime + (b.coolTime || 0)));
        break;
      case 'shelf':
        result.sort((a, b) => (b.shelfLife || 0) - (a.shelfLife || 0));
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return result;
  }, [recipes, searchTerm, sortOrder]);

  return (
    <>
      <Seo title="Home" />
      <SearchAndSortContainer>
        <SearchInput
          data-test-id="search-input"
          type="text"
          placeholder="Search recipes by title or tag..."
          onChange={e => setSearchTerm(e.target.value)}
        />
        <SortSelect onChange={e => setSortOrder(e.target.value as SortOption)} value={sortOrder}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="time">Quickest</option>
          <option value="shelf">Longlasting</option>
        </SortSelect>
      </SearchAndSortContainer>
      <RecipeGrid>
        {filteredAndSortedRecipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={{
            id: recipe.id,
            title: recipe.title,
            slug: recipe.slug,
            prepTime: recipe.prepTime,
            cookTime: recipe.cookTime,
            coolTime: recipe.coolTime,
            shelfLife: recipe.shelfLife,
            fridgeLife: recipe.fridgeLife,
            freezerLife: recipe.freezerLife,
            tags: recipe.tags,
            createdAt: recipe.createdAt,
            ingredients: recipe.ingredients, 
            instructions: recipe.instructions, 
            thumbnail: recipe.thumbnail}} />
        ))}
      </RecipeGrid>
    </>
  );
};

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    allContentfulRecipe {
      nodes {
        id
        title
        slug
        prepTime
        cookTime
        coolTime
        shelfLife
        fridgeLife
        freezerLife
        tags
        createdAt
        thumbnail {
          gatsbyImageData(width: 300, height: 300, layout: CONSTRAINED, placeholder: BLURRED, cropFocus: BOTTOM)
        }
      }
    }
  }
`; 