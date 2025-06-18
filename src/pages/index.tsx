import React, { useState, useMemo, useEffect } from 'react';
import styled from '@emotion/styled';
import { graphql, PageProps } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { RecipeCard } from '../components/RecipeCard';
import { Seo } from '../components/Seo';
import { TagFilter } from '../components/TagFilter';
import { ContentfulRecipe } from '../types';

const SearchAndSortContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  align-items: start;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 2rem;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (min-width: 769px) {
    max-width: 400px;
  }
`;

const FilterSortWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    gap: 1rem;
  }
  
  @media (min-width: 769px) {
    justify-self: flex-end;
  }
`;

const FilterWrapper = styled.div`
  flex: 1 1 auto;
  max-width: 300px;
  min-width: 140px;
  
  @media (max-width: 480px) {
    max-width: 100%;
    width: 100%;
  }
`;

const SearchInput = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid ${({ theme }) => theme.colors.gray.light};
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  max-width: 400px;
  background-color: rgba(255, 255, 255, 0.9);
  transition: all 0.2s ease-in-out;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  
  &:hover, &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray.medium};
  }
`;

const SortContainer = styled.div`
  position: relative;
  display: inline-block;
  
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 0.5rem;
  }
`;

const SortSelect = styled.select`
  padding: 0.75rem 2.75rem 0.75rem 1.25rem;
  border: 2px solid ${({ theme }) => theme.colors.gray.light};
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  background-color: white;
  color: ${({ theme }) => theme.colors.text};
  appearance: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%234B5563' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 6h18'/%3E%3Cpath d='M6 12h12'/%3E%3Cpath d='M9 18h6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: 1rem center;
  padding-left: 2.5rem;
  padding-right: 1.25rem;
  background-size: 1rem;
  width: 100%;
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }
  
  &:hover, &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }
`;

const RecipeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

type SortOption = 'newest' | 'oldest' | 'time' | 'shelf';

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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);

  // Extract all unique tags from recipes
  useEffect(() => {
    const tags = new Set<string>();
    recipes.forEach(recipe => {
      if (recipe.tags) {
        recipe.tags.forEach(tag => tags.add(tag));
      }
    });
    setAllTags(Array.from(tags).sort());
  }, [recipes]);

  const filteredAndSortedRecipes = useMemo(() => {
    let result = [...recipes];

    // Filter by search term
    if (searchTerm) {
      result = result.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      result = result.filter(recipe => 
        recipe.tags && selectedTags.every(tag => recipe.tags?.includes(tag))
      );
    }

    // Sort the results
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
  }, [recipes, searchTerm, sortOrder, selectedTags]);

  return (
    <>
      <Seo title="Home" />
      <SearchAndSortContainer>
        <SearchContainer>
          <SearchInput
            data-test-id="search-input"
            type="text"
            placeholder="Search recipes by title"
            onChange={e => setSearchTerm(e.target.value)}
            aria-label="Search recipes"
            value={searchTerm}
          />
        </SearchContainer>
        
        <FilterSortWrapper>
          <FilterWrapper>
            <TagFilter 
              availableTags={allTags}
              selectedTags={selectedTags}
              onTagToggle={(tag: string) => {
                setSelectedTags(prev => 
                  prev.includes(tag) 
                    ? prev.filter(t => t !== tag) 
                    : [...prev, tag]
                );
              }}
              onClearAll={() => setSelectedTags([])}
            />
          </FilterWrapper>
          
          <SortContainer>
            <SortSelect 
              id="sort-recipes"
              onChange={e => {
                setSortOrder(e.target.value as SortOption); 
                e.currentTarget.blur();
              }} 
              value={sortOrder}
              aria-label="Sort recipes"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="time">Quickest to Make</option>
              <option value="shelf">Longest Shelf Life</option>
            </SortSelect>
          </SortContainer>
        </FilterSortWrapper>
      </SearchAndSortContainer>
      <RecipeGrid>
        {filteredAndSortedRecipes.map(recipe => ({
          ...recipe,
          // Ensure required fields have default values if missing
          ingredients: recipe.ingredients || [],
          instructions: recipe.instructions || {
            raw: JSON.stringify({ nodeType: 'document', data: {}, content: [] }),
            references: []
          },
          // Ensure other required fields have defaults if needed
          coolTime: recipe.coolTime || undefined,
          shelfLife: recipe.shelfLife || undefined,
          fridgeLife: recipe.fridgeLife || undefined,
          freezerLife: recipe.freezerLife || undefined,
          thumbnail: recipe.thumbnail || undefined
        })).map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
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
          gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, width: 600)
        }
      }
    }
  }
`;
