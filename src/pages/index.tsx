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

const ResultsSummary = styled.p`
  margin: 0 0 1rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const EmptyState = styled.div`
  padding: 3rem 1.5rem;
  text-align: center;
  background: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.gray.light};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text};
`;

const PaginationNav = styled.nav`
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
`;

const PaginationList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (max-width: 480px) {
    gap: 0.35rem;
  }
`;

const PaginationButton = styled.button<{ isActive?: boolean }>`
  min-width: 2.75rem;
  min-height: 2.75rem;
  padding: 0.65rem 0.95rem;
  border: 2px solid
    ${({ theme, isActive }) => isActive ? theme.colors.primary : theme.colors.gray.light};
  border-radius: 8px;
  background: ${({ theme, isActive }) => isActive ? theme.colors.primary : theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  transition: all 0.2s ease;

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }

  @media (max-width: 480px) {
    min-width: 2.35rem;
    min-height: 2.35rem;
    padding: 0.5rem 0.65rem;
  }
`;

const PaginationIcon = styled.span`
  display: inline-block;
  line-height: 1;
`;

type SortOption = 'newest' | 'oldest' | 'time' | 'shelf';

const RECIPES_PER_PAGE = 12;

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
  const [currentPage, setCurrentPage] = useState(1);

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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOrder, selectedTags]);

  const totalPages = Math.ceil(filteredAndSortedRecipes.length / RECIPES_PER_PAGE);
  const safeCurrentPage = totalPages > 0 ? Math.min(currentPage, totalPages) : 1;
  const pageStartIndex = (safeCurrentPage - 1) * RECIPES_PER_PAGE;
  const currentPageRecipes = filteredAndSortedRecipes.slice(
    pageStartIndex,
    pageStartIndex + RECIPES_PER_PAGE
  );
  const firstVisibleRecipe = filteredAndSortedRecipes.length === 0 ? 0 : pageStartIndex + 1;
  const lastVisibleRecipe = Math.min(
    pageStartIndex + RECIPES_PER_PAGE,
    filteredAndSortedRecipes.length
  );

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

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
      <ResultsSummary aria-live="polite" data-testid="results-summary">
        {filteredAndSortedRecipes.length > 0
          ? `Showing ${firstVisibleRecipe}-${lastVisibleRecipe} of ${filteredAndSortedRecipes.length} recipes`
          : 'No recipes found'}
      </ResultsSummary>

      {currentPageRecipes.length > 0 ? (
        <>
          <RecipeGrid>
            {currentPageRecipes.map(recipe => ({
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

          {totalPages > 1 && (
            <PaginationNav aria-label="Recipe pagination">
              <PaginationList>
                <li>
                  <PaginationButton
                    type="button"
                    onClick={() => goToPage(safeCurrentPage - 1)}
                    disabled={safeCurrentPage === 1}
                    aria-label="Previous page"
                  >
                    <PaginationIcon aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </PaginationIcon>
                  </PaginationButton>
                </li>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
                  <li key={page}>
                    <PaginationButton
                      type="button"
                      onClick={() => goToPage(page)}
                      isActive={page === safeCurrentPage}
                      aria-current={page === safeCurrentPage ? 'page' : undefined}
                      aria-label={`Page ${page}`}
                    >
                      {page}
                    </PaginationButton>
                  </li>
                ))}
                <li>
                  <PaginationButton
                    type="button"
                    onClick={() => goToPage(safeCurrentPage + 1)}
                    disabled={safeCurrentPage === totalPages}
                    aria-label="Next page"
                  >
                    <PaginationIcon aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </PaginationIcon>
                  </PaginationButton>
                </li>
              </PaginationList>
            </PaginationNav>
          )}
        </>
      ) : (
        <EmptyState>
          Try adjusting your search or filters to find a recipe.
        </EmptyState>
      )}
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
