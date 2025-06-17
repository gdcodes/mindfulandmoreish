import React from 'react';
import { graphql, PageProps } from 'gatsby';
import styled from '@emotion/styled';
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, Block, Inline } from '@contentful/rich-text-types';
import { Seo } from '../components/Seo';
import { PhotoGallery } from '../components/PhotoGallery';
import { ContentfulRecipe } from '../types';
import { FaRegClock, FaFireAlt, FaSnowflake, FaHourglassHalf, FaBox, FaTemperatureLow, FaWind } from 'react-icons/fa';
import { IGatsbyImageData } from 'gatsby-plugin-image';

const RecipeContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const RecipeHeader = styled.header`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    font-size: 3rem;
  }
`;

const Section = styled.section`
  background: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 6px 20px ${({ theme }) => theme.colors.shadow};
  margin: 3rem 0;
  padding: 2.5rem;
  border: 1px solid ${({ theme }) => theme.colors.gray.medium};
  position: relative;
  border-left: 5px solid ${({ theme }) => theme.colors.primary};
`;

const PlayfulHeading = styled.h2`
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: 'Merriweather', serif;
  font-weight: 700;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 0.5em;
  border-bottom: 2px solid ${({ theme }) => theme.colors.nut};
  padding-bottom: 0.8rem;
`;

const MetaData = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.gray.light};
  border-radius: 8px;
  flex-wrap: wrap;
`;

const MetaDataItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4em;
  text-align: center;
`;

const MetaDataValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  color: ${({ theme }) => theme.colors.primary};

  strong {
    font-size: 1.2rem;
  }
`;

const MetaDataLabel = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const StyledBulletedList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 1.5rem 0;

  li {
    position: relative;
    padding-left: 1.8em;
    margin-bottom: 0.8em; /* Reduced spacing */
    font-size: 1.05em;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.text};
    font-family: 'Merriweather', serif;
  }
  li::before {
    content: '';
    position: absolute;
    left: 0.5em;
    top: 0.65em;
    width: 0.6em;
    height: 0.6em;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const StyledOrderedList = styled.ol`
  list-style: none;
  padding-left: 0;
  margin: 1.5rem 0 1.5rem 0;
  counter-reset: item;

  li {
    position: relative;
    padding-left: 2.2em;
    margin-bottom: 1.1em;
    font-size: 1.08em;
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.text};
    font-family: 'Merriweather', serif;
  }
  li::before {
    content: counter(item) '.';
    counter-increment: item;
    position: absolute;
    left: 0.5em;
    top: 0;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
    font-family: 'Merriweather', serif;
    font-size: 1.1em;
    line-height: 1.7;
  }
`;

// Custom render options for all lists
const renderOptions: Options = {
  renderNode: {
    [BLOCKS.UL_LIST]: (node: Block | Inline, children) => <StyledBulletedList>{children}</StyledBulletedList>,
    [BLOCKS.OL_LIST]: (node: Block | Inline, children) => <StyledOrderedList>{children}</StyledOrderedList>,
  },
};

interface Photo {
  gatsbyImageData: IGatsbyImageData;
  description: string;
  contentful_id?: string;
}

interface RecipeTemplateProps extends PageProps<{ contentfulRecipe: ContentfulRecipe }> {}

const RecipeTemplate: React.FC<RecipeTemplateProps> = ({ data }) => {
  const recipe = data.contentfulRecipe;

  // Combine thumbnail and photos for the gallery, ensuring no duplicates.
  const galleryPhotos = React.useMemo(() => {
    const photos = recipe.photos ? [...recipe.photos] : [];
    const thumbnail = recipe.thumbnail;

    if (thumbnail) {
      const isThumbnailInPhotos = photos.some(
        photo => photo.contentful_id === thumbnail.contentful_id
      );

      if (!isThumbnailInPhotos) {
        // Add thumbnail to the beginning of the gallery array.
        // Provide a fallback description for the thumbnail.
        photos.unshift({ ...thumbnail, description: recipe.title });
      }
    }
    return photos;
  }, [recipe.photos, recipe.thumbnail, recipe.title]);

  return (
    <>
      <Seo title={recipe.title} description={`A recipe for ${recipe.title}`} />
      <RecipeContainer>
        <RecipeHeader>
          <h1>{recipe.title}</h1>
        </RecipeHeader>

        <Section>
          <PlayfulHeading>Ingredients</PlayfulHeading>
          {recipe.ingredients?.raw && documentToReactComponents(JSON.parse(recipe.ingredients.raw), renderOptions)}
        </Section>

        <Section>
          <PlayfulHeading>Method</PlayfulHeading>
          {recipe.instructions?.raw && documentToReactComponents(JSON.parse(recipe.instructions.raw), renderOptions)}
        </Section>

        <Section>
          <PlayfulHeading>Time</PlayfulHeading>
          <MetaData>
            <MetaDataItem>
              <MetaDataValue>
                <FaRegClock size={22} />
                <strong>{recipe.prepTime}</strong>
              </MetaDataValue>
              <MetaDataLabel>Prep Time (min)</MetaDataLabel>
            </MetaDataItem>
            <MetaDataItem>
              <MetaDataValue>
                <FaFireAlt size={22} />
                <strong>{recipe.cookTime}</strong>
              </MetaDataValue>
              <MetaDataLabel>Cook Time (min)</MetaDataLabel>
            </MetaDataItem>
            {recipe.coolTime != null && (
              <MetaDataItem>
                <MetaDataValue>
                  <FaWind size={22} />
                  <strong>{recipe.coolTime}</strong>
                </MetaDataValue>
                <MetaDataLabel>Cool Time (min)</MetaDataLabel>
              </MetaDataItem>
            )}
            <MetaDataItem>
              <MetaDataValue>
                <FaHourglassHalf size={22} />
                <strong>{recipe.prepTime + recipe.cookTime + (recipe.coolTime || 0)}</strong>
              </MetaDataValue>
              <MetaDataLabel>Total Time (min)</MetaDataLabel>
            </MetaDataItem>
            {recipe.shelfLife != null && (
              <MetaDataItem>
                <MetaDataValue>
                  <FaBox size={22} />
                  <strong>{recipe.shelfLife}</strong>
                </MetaDataValue>
                <MetaDataLabel>Max Shelf Life (days)</MetaDataLabel>
              </MetaDataItem>
            )}
            {recipe.fridgeLife != null && (
              <MetaDataItem>
                <MetaDataValue>
                  <FaTemperatureLow size={22} />
                  <strong>{recipe.fridgeLife}</strong>
                </MetaDataValue>
                <MetaDataLabel>Max Fridge Life (days)</MetaDataLabel>
              </MetaDataItem>
            )}
            {recipe.freezerLife != null && (
              <MetaDataItem>
                <MetaDataValue>
                  <FaSnowflake size={22} />
                  <strong>{recipe.freezerLife}</strong>
                </MetaDataValue>
                <MetaDataLabel>Max Freezer Life (days)</MetaDataLabel>
              </MetaDataItem>
            )}
          </MetaData>
        </Section>

        {recipe.tips?.raw && (
          <Section>
            <PlayfulHeading>Tips</PlayfulHeading>
            {documentToReactComponents(JSON.parse(recipe.tips.raw), renderOptions)}
          </Section>
        )}

        {galleryPhotos.length > 0 && (
          <Section>
            <PlayfulHeading>Photos</PlayfulHeading>
            <PhotoGallery photos={galleryPhotos as Photo[]} />
          </Section>
        )}
      </RecipeContainer>
    </>
  );
};

export default RecipeTemplate;

export const query = graphql`
  query RecipeBySlug($slug: String!) {
    contentfulRecipe(slug: { eq: $slug }) {
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
      ingredients {
        raw
      }
      instructions {
        raw
      }
      tips {
        raw
      }
      thumbnail {
        gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED, width: 400)
        contentful_id
      }
      photos {
        gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED, width: 800)
        description
        contentful_id
      }
    }
  }
`; 