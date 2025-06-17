import React from 'react';
import styled from '@emotion/styled';
import { Seo } from '../components/Seo';
import logo from '../images/logo.png';

const AboutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-family: 'Pacifico', cursive;
  font-size: 3.5rem;
  color: ${({ theme }) => theme.colors.cta};
  margin-bottom: 2rem;
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 0 auto 2rem auto;
  box-shadow: 0 8px 25px ${({ theme }) => theme.colors.shadow};
  border: 4px solid ${({ theme }) => theme.colors.primary};
`;

const Section = styled.section`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  text-align: left;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0 4px 15px ${({ theme }) => theme.colors.shadow};

  h2 {
    font-family: 'Merriweather', serif;
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-bottom: 1.5rem;
  }

  p {
    margin-bottom: 1.5rem;
  }
`;

const AboutPage = () => {
  return (
    <>
      <Seo
        title="About Us"
        description="Learn more about the story and passion behind Mindful and Moreish."
      />
      <AboutContainer>
        <PageTitle>Our Story</PageTitle>
        <ProfileImage src={logo} alt="Mindful and Moreish Founder" />
        
        <Section>
          <h2>Welcome to Mindful and Moreish!</h2>
          <p>
            Hello and welcome! We are so thrilled to have you here. Mindful and Moreish was born from a simple idea: 
            that food should be both nourishing for the body and delightful for the senses. It's about finding that 
            perfect balance between healthy, mindful eating and the sheer joy of a truly moreish meal.
          </p>
          <p>
            This is a non-monetised website, created simply to encourage others to cook and enjoy good food at home.
          </p>
          <p>
            Our journey began in a small kitchen, with a passion for fresh, seasonal ingredients and a love for creating 
            recipes that make you feel good from the inside out. We believe in food that is vibrant, flavourful, and 
            uncomplicated.
          </p>
        </Section>
        
        <Section>
          <h2>Our Philosophy</h2>
          <p>
            At Mindful and Moreish, we focus on recipes that are approachable for home cooks of all skill levels. 
            We aim to inspire you to get creative in the kitchen, to try new things, and to fall in love with the 
            process of cooking. Our philosophy is simple:
          </p>
          <ul>
            <li><strong>Use Whole Foods:</strong> We prioritise fresh, unprocessed ingredients.</li>
            <li><strong>Embrace Flavour:</strong> Healthy eating should never be boring! We love herbs, spices, and all things delicious.</li>
            <li><strong>Listen to Your Body:</strong> We encourage intuitive eating and finding what truly nourishes you.</li>
          </ul>
        </Section>

        <Section>
          <h2>Join Our Community</h2>
          <p>
            This blog is more than just a collection of recipes; it's a community. We would love to connect with you! 
            Follow us on Instagram for daily inspiration, and feel free to reach out with any questions or just to say hello. 
            Happy cooking!
          </p>
        </Section>
      </AboutContainer>
    </>
  );
};

export default AboutPage; 