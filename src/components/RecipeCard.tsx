import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { ContentfulRecipe } from '../types';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  position: relative;
  aspect-ratio: 1 / 1;
`;

const CardContent = styled.div`
  padding: 1.5rem;
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 60%);
  color: ${({ theme }) => theme.colors.white};
`;

const Title = styled.h3`
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.white};
  transition: color 0.2s ease-in-out;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.2);
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  color: ${({ theme }) => theme.colors.gray.light};
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover ${Card} {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px ${({ theme }) => theme.colors.shadow};
  }

  &:hover ${Title} {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  background: rgba(255, 255, 255, 0.85);
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const CardGatsbyImage = styled(GatsbyImage)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

interface RecipeCardProps {
  recipe: ContentfulRecipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const image = recipe.thumbnail?.gatsbyImageData && getImage(recipe.thumbnail.gatsbyImageData);

  return (
    <CardLink to={`/recipe/${recipe.slug}/`}>
      <Card>
        {image && <CardGatsbyImage image={image} alt={recipe.title} />}
        <CardContent>
          <Title>{recipe.title}</Title>
          <MetaInfo>
            <span>Ready in: {recipe.prepTime + recipe.cookTime + (recipe.coolTime || 0)} min</span>
            {recipe.shelfLife && <span>Shelf: {recipe.shelfLife} days</span>}
            {recipe.fridgeLife && <span>Fridge: {recipe.fridgeLife} days</span>}
          </MetaInfo>
          <TagContainer>
            {recipe.tags?.map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagContainer>
        </CardContent>
      </Card>
    </CardLink>
  );
}; 