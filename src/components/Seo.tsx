import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

interface SeoProps {
  title?: string;
  description?: string;
}

export const Seo = ({ title, description }: SeoProps) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;

  return (
    <>
      <title>{title ? `${title} | ${defaultTitle}` : defaultTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={site.siteMetadata?.author || ``} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
    </>
  );
}; 