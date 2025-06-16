import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { Seo } from '../components/Seo';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
  height: 100%;
`;

const Title = styled.h1`
  font-size: 6rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 2rem;
`;

const HomeLink = styled(Link)`
  font-size: 1.2rem;
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.white};
  }
`;


const NotFoundPage = () => {
  return (
    <>
      <Seo title="404: Not Found" />
      <Container>
        <Title>404</Title>
        <Subtitle>Oops! The page you're looking for doesn't exist.</Subtitle>
        <HomeLink to="/">Go back to the homepage</HomeLink>
      </Container>
    </>
  );
};

export default NotFoundPage; 