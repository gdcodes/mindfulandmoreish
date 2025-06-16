import path from "path";
import type { GatsbyNode } from "gatsby";

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    # This type is a simplified version of the rich text field,
    # ensuring we can query the 'raw' JSON string.
    type ContentfulRichText {
      raw: String
    }

    type ContentfulRecipe implements Node {
      title: String!
      slug: String!
      prepTime: Int!
      cookTime: Int!
      coolTime: Int
      shelfLife: Int
      fridgeLife: Int
      freezerLife: Int
      tags: [String!]
      createdAt: Date! @dateformat
      ingredients: ContentfulRichText
      instructions: ContentfulRichText
      tips: ContentfulRichText
      thumbnail: ContentfulAsset @link(by: "id", from: "thumbnail___NODE")
      photos: [ContentfulAsset] @link(by: "id", from: "photos___NODE")
    }
  `;
  createTypes(typeDefs);
};

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const recipeTemplate = path.resolve(`./src/templates/recipe.tsx`);

  const result = await graphql<{ allContentfulRecipe: { nodes: { slug: string }[] } }>(`
    query {
      allContentfulRecipe {
        nodes {
          slug
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  result.data?.allContentfulRecipe.nodes.forEach(recipe => {
    createPage({
      path: `/recipe/${recipe.slug}/`,
      component: recipeTemplate,
      context: {
        slug: recipe.slug,
      },
    });
  });
}; 