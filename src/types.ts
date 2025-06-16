import { IGatsbyImageData } from 'gatsby-plugin-image';
import { Document } from '@contentful/rich-text-types';

export interface ContentfulRecipe {
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
  ingredients: { raw: string };
  instructions: { raw: string };
  tips?: { raw: string };
  photos?: {
    gatsbyImageData: IGatsbyImageData;
    description: string;
    contentful_id: string;
  }[];
  thumbnail?: {
    gatsbyImageData: IGatsbyImageData;
    contentful_id: string;
  };
} 