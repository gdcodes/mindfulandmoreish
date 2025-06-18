import React from 'react';
import styled from '@emotion/styled';
import { Seo } from '../components/Seo';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const LastUpdated = styled.p`
  text-align: center;
  font-style: italic;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2rem;
  opacity: 0.8;
`;

const Section = styled.section`
  margin-bottom: 2rem;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  box-shadow: 0 2px 12px ${({ theme }) => theme.colors.shadow};
  line-height: 1.8;
`;

const SectionTitle = styled.h2`
  font-family: 'Merriweather', serif;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1.5rem;
`;

const Text = styled.p`
  margin-bottom: 1rem;
`;

const List = styled.ul`
  margin: 1rem 0;
  padding-left: 2rem;
  
  li {
    margin-bottom: 0.5rem;
  }
`;

const PrivacyPage = () => {
  return (
    <>
      <Seo 
        title="Privacy Policy"
        description="Our Privacy Policy outlines how Mindful and Moreish collects, uses, and protects your personal data."
      />
      <Container>
        <Title>Privacy Policy</Title>
        <LastUpdated>Last updated: 18 June 2025</LastUpdated>

        <Section>
          <SectionTitle>Introduction</SectionTitle>
          <Text>
            This Privacy Policy ("policy") constitutes a legally binding agreement between you ("you," "user") and Mindful and Moreish ("we," "us," or "our") regarding the collection, use, and protection of your personal data when you access or use the mindfulandmoreish.com website ("the site").
          </Text>
          <Text>
            By accessing or using the site, you acknowledge that you have read, understood, and agree to the terms of this policy. If you do not agree with any part of this Privacy Policy, please do not use the site.
          </Text>
          <Text>
            We are committed to protecting your privacy and handling your personal data with transparency and care. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit or interact with the site.
          </Text>
          <Text>
            We reserve the right to modify this Privacy Policy at any time and for any reason. Changes will be effective immediately upon posting 
            to the site. Your continued use of the site after any changes indicates your acceptance of the 
            updated policy. 
          </Text>
        </Section>
        
        <Section>
          <SectionTitle>Collection of Your Information</SectionTitle>
          <Text>
            We are committed to your privacy. We do not collect any personally identifiable information from you, such as your name or email address. 
          </Text>
          <Text>
            However, our servers may automatically collect non-personal "Derivative Data" when you access the site. This includes information like your IP address, browser type, operating system, and the pages you view on our site. This data is used solely for the purpose of analysing website traffic and improving user experience.
          </Text>
        </Section>

        <Section>
          <SectionTitle>Use of Your Information</SectionTitle>
          <Text>
            Having accurate information about you permits us to provide you with a smooth, efficient, and customised experience. Specifically, we may use information collected about you via the site to:
          </Text>
          <List>
            <li>Analyse usage and trends to improve your experience with the site.</li>
            <li>Protect the site from abuse and spam.</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>Analytics & Tracking Technologies</SectionTitle>
          <Text>
            We use Microsoft Clarity to collect data on how you interact with our site through heatmaps, session replays, and behavioural metrics. This helps us improve our site, enhance security, and better understand user activity. Data is collected via cookies and similar technologies. By using our site, you agree that we and Microsoft may collect and use this data to see how you use our site. For details, see the <a style={{ wordBreak: 'break-all' }} href="https://privacy.microsoft.com/en-gb/privacystatement" target="_blank" rel="noopener noreferrer">Microsoft Privacy Statement</a>.
          </Text>
        </Section>

        <Section>
          <SectionTitle>Third-Party Websites</SectionTitle>
          <Text>
            The site may contain links to third-party websites and applications of interest, including advertisements and external services, that are not affiliated with us. Once you have used these links to leave the site, any information you provide to these third parties is not covered by this Privacy Policy, and we cannot guarantee the safety and privacy of your information.
          </Text>
        </Section>
        
        <Section>
          <SectionTitle>Contact Us</SectionTitle>
          <Text>
            If you have questions or comments about this Privacy Policy, please contact us at:{' '}
            <a href="mailto:info@mindfulandmoreish.com" style={{ wordBreak: 'break-all' }}>info@mindfulandmoreish.com</a>
          </Text>
        </Section>
      </Container>
    </>
  );
};

export default PrivacyPage; 