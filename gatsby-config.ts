import "dotenv/config";
import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Mindful and Moreish`,
    description: `Mindful Meals. Moreish Moments. Discover delicious and nourishing recipes for a balanced lifestyle.`,
    author: `@mindfulandmoreish`,
    siteUrl: `https://mindfulandmoreish.com`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        sourceMap: true,
        autoLabel: 'dev-only',
        labelFormat: `[local]`,
        cssPropOptimization: true,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Mindful and Moreish`,
        short_name: `Mindful and Moreish`,
        start_url: `/`,
        background_color: `#FAF7F0`,
        theme_color: `#F4A259`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`, // This path is relative to the root of the site.
        icon_options: {
          purpose: `any maskable`,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
      },
    },
    {
      resolve: `gatsby-plugin-clarity`,
      options: {
        clarity_project_id: process.env.CLARITY_PROJECT_ID,
        enable_on_dev_env: false
      },
    },
  ],
};

export default config; 