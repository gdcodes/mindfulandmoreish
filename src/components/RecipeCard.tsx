import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { ContentfulRecipe } from '../types';

// Styled components
const StyledCard = styled.div`
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(90, 111, 175, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  position: relative;
  aspect-ratio: 1 / 1;
  height: 100%;
  width: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(90, 111, 175, 0.15);
  }
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
  color: #ffffff;
`;

const Title = styled.h3`
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  color: #ffffff;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  transition: color 0.2s ease-in-out;
  
  ${StyledCard}:hover & {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  color: #f2f2f2;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  background: rgba(255, 255, 255, 0.85);
  color: #2f2f2f;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const CardImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  & > div {
    height: 100%;
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
`;

interface CardLinkProps {
  to: string;
  children: React.ReactNode;
}

// Styled Link component that works with Emotion's css prop
const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  display: 'block',
  height: '100%',
});

const CardLinkWrapper: React.FC<CardLinkProps> = ({ to, children }) => (
  <StyledLink to={to}>
    {children}
  </StyledLink>
);

interface RecipeCardProps {
  recipe: ContentfulRecipe;
}

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => (
  <StyledCard>
    {children}
  </StyledCard>
);

interface TitleProps {
  children: React.ReactNode;
  isHovered?: boolean;
}

interface ChildrenProps {
  children: React.ReactNode;
}

interface CardGatsbyImageProps {
  image: IGatsbyImageData;
  alt: string;
}

const CardGatsbyImage: React.FC<CardGatsbyImageProps> = ({ image, alt }) => (
  <CardImageContainer>
    <GatsbyImage
      image={image}
      alt={alt}
      style={{
        height: '100%',
        width: '100%',
      }}
      imgStyle={{
        objectFit: 'cover',
      }}
    />
  </CardImageContainer>
);

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const {
    title,
    slug,
    prepTime,
    cookTime,
    coolTime = 0,
    shelfLife,
    fridgeLife,
    tags,
    thumbnail,
  } = recipe;

  const image = thumbnail?.gatsbyImageData && getImage(thumbnail.gatsbyImageData);

  return (
    <CardLinkWrapper to={`/recipe/${slug}/`}>
      <Card>
        {image && <CardGatsbyImage image={image} alt={title} />}
        <CardContent>
          <Title>{title}</Title>
          <MetaInfo>
            <span>Ready in: {prepTime + cookTime + (coolTime || 0)} min</span>
            {shelfLife && <span>Shelf: {shelfLife} days</span>}
            {fridgeLife && <span>Fridge: {fridgeLife} days</span>}
          </MetaInfo>
          <TagContainer>
            {tags?.map((tag) => (
              <Tag key={tag}>
                {tag}
              </Tag>
            ))}
          </TagContainer>
        </CardContent>
      </Card>
    </CardLinkWrapper>
  );
}; 