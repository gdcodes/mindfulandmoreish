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
  line-height: 1.6;
`;

const List = styled.ul`
  margin: 1rem 0;
  padding-left: 2rem;
  
  li {
    margin-bottom: 0.5rem;
  }
`;

const TermsPage = () => {
  return (
    <>
      <Seo 
        title="Terms and Disclaimer" 
        description="Terms of use and legal disclaimer for Mindful and Moreish recipes and content."
      />
      <Container>
        <Title data-test-id="terms-title">Terms and Disclaimer</Title>
        <LastUpdated>Last updated: 18 June 2025</LastUpdated>
        
        
      <Section>
        <SectionTitle>Agreement to Terms</SectionTitle>
        <Text>
          These Terms of Use ("terms") constitute a legally binding agreement between you ("you," "user") and Mindful and Moreish ("we," "us," "our") regarding your access to and use of the mindfulandmoreish.com website ("the site").
        </Text>
        <Text>
          By accessing or using the site, you acknowledge that you have read, understood, and agree to be bound by these terms. If you do not agree to these terms, you must not access or use the site.
        </Text>
      </Section>
      <Section>
        <SectionTitle>Legal Disclaimer</SectionTitle>
         <Text>
          The information provided on Mindful and Moreish is for general informational and educational purposes only. 
        While we strive to provide accurate and up-to-date recipes and cooking information, we make no representations 
        or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, 
        or availability of the information, products, services, or related graphics contained on the website.
         </Text>
         <Text>
            Any reliance you place on such information is therefore strictly at your own risk. In no event shall Mindful and Moreish be liable for any loss or damage, including without limitation indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits, arising out of or in connection with the use of this website.
          </Text>
        </Section>

        <Section>
          <SectionTitle>Food Safety & Allergies</SectionTitle>
          <Text>
            Please note that:
          </Text>
          <List>
            <li>
              All recipe instructions should be followed carefully, particularly regarding cooking temperatures and times 
              to ensure food safety.
            </li>
            <li>
              While we aim to highlight common allergens in our recipes, we cannot guarantee that our recipes are free from specific 
              allergens due to potential cross-contamination during ingredient production and packaging.
            </li>
            <li>
              It is your responsibility to verify all ingredients and ensure they are suitable for your dietary needs.
            </li>
            <li>
              Storage times and conditions mentioned in recipes are guidelines only — please use your judgment and follow proper food safety practices.
            </li>
          </List>
        </Section>

        <Section>
          <SectionTitle>Copyright and Licensing</SectionTitle>
          <Text>
            The website's code is licensed under the GNU GPL v3.0 and may be used, modified, and shared in accordance with its terms.
            All non-code content—including logos, images, text, recipes, and cooking instructions—is the intellectual property of Mindful and Moreish and may not be reproduced or distributed without prior written permission.
          </Text>
          <Text>
            Recipes are provided for personal use only and may not be used for commercial purposes without explicit written consent.
          </Text>
        </Section>

        <Section>
          <SectionTitle>Changes to Terms</SectionTitle>
          <Text>
            Any disputes arising from the use of the site shall be governed by and construed in accordance with the laws of England and Wales. By using the site, you agree that the courts of England and Wales shall have exclusive jurisdiction to resolve any disputes.

            We reserve the right to modify these terms at any time and for any reason. Changes will be effective immediately upon posting 
            to the site. Your continued use of the site after any changes indicates your acceptance of the 
            modified terms.
          </Text>
        </Section>

        <Section>
          <SectionTitle>Contact Us</SectionTitle>
          <Text>
            If you have any questions about these terms or the practices of the site, please contact us at:{' '}
            <a href="mailto:info@mindfulandmoreish.com" style={{ wordBreak: 'break-all' }}>info@mindfulandmoreish.com</a>
          </Text>
        </Section>
      </Container>
    </>
  );
};

export default TermsPage; 