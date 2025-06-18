import Clarity from '@microsoft/clarity';
import React, { useState, ReactNode, useEffect } from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { FaGithub, FaInstagram, FaRegEnvelope, FaBars, FaTimes } from 'react-icons/fa';
import { ThemeProvider } from '../theme/ThemeProvider';
import { Seo } from './Seo';
import logo from '../images/logo-no-background.png';
import iconLime from '../images/icon-lime.png';
import iconGinger from '../images/icon-ginger.png';
import iconBlueberry from '../images/icon-blueberry.png';
import iconOrange from '../images/icon-orange.png';
import iconAlmond from '../images/icon-almond.png';
import iconRaspberry from '../images/icon-raspberry.png';
import '@fontsource/pacifico';
import '@fontsource/merriweather';

// Theme types are imported from theme.d.ts

const SiteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background: ${({ theme }) => theme.colors.background};
  padding: 1rem 2.5rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.nut};
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${({ theme }) => `0 4px 12px ${theme.colors.shadow}`};
  position: sticky;
  top: 0;
  z-index: 1000;
  
  @media (max-width: 820px) {
    padding: 0.75rem 1.5rem;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  
  @media (max-width: 375px) {
    padding: 0.75rem 1rem;
  }
`;

const LogoContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  gap: 0.5rem;
  text-align: center;
  
  @media (min-width: 821px) {
    flex-direction: row;
    gap: 1.5rem;
    text-align: left;
  }
  
  @media (max-width: 820px) {
    flex: 1;
    justify-content: center;
  }
`;

const LogoImg = styled.img`
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  box-shadow: ${({ theme }) => `0 2px 8px ${theme.colors.shadow}`};
  object-fit: contain;
  object-position: center;
  background-color: white;
  padding: 12px;
  margin: 0 auto;
  
  @media (max-width: 820px) {
    width: 60px;
    height: 60px;
    padding: 10px;
  }
  
  @media (max-width: 375px) {
    width: 50px;
    height: 50px;
  }
`;

const TitleContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HandwritingTitle = styled.h1`
  color: ${({ theme }) => theme.colors.cta};
  font-family: 'Pacifico', cursive;
  font-size: 2.4rem;
  margin: 0;
  letter-spacing: 1.5px;
  font-weight: normal;
  
  @media (max-width: 820px) {
    font-size: 1.8rem;
    letter-spacing: 1px;
  }
  
  @media (max-width: 375px) {
    font-size: 1.4rem;
    letter-spacing: 0.5px;
  }
`;

const Tagline = styled.p`
  color: ${({ theme }) => theme.colors.highlight};
  font-size: 1rem;
  margin: 0.25rem 0 0 0;
  font-family: 'Merriweather', serif;
  font-weight: 600;
  letter-spacing: 0.5px;
  
  @media (max-width: 820px) {
    font-size: 0.9rem;
  }
  
  @media (max-width: 375px) {
    font-size: 0.8rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2.5rem;
  @media (max-width: 820px) {
    display: none;
  }
`;

interface NavLinkProps {
  $isActive?: boolean;
}

const NavLink = styled(Link)<NavLinkProps>`
  color: ${({ theme, $isActive }) => $isActive ? theme.colors.primary : theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  transition: color 0.2s ease;
  position: relative;
  padding: 0.5rem 0;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
    transition: width 0.3s ease;
  }
  &:hover::after {
    width: 100%;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  display: none;
  
  @media (max-width: 820px) {
    display: block;
    margin-left: auto;
  }
  transition: color 0.3s ease;
  width: 40px;
  height: 40px;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  @media (max-width: 820px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & svg {
    width: 24px;
    height: 24px;
  }
  @media (max-width: 375px) {
    width: 36px;
    height: 36px;
    & svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const CloseButton = styled(MobileMenuButton)`
  position: relative;
  margin: 2rem auto 0;
  width: auto;
  min-width: 120px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.leaf};
  border: 2px solid ${({ theme }) => theme.colors.leaf};
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.2s ease-in-out;
  
  &:hover {
    background: ${({ theme }) => theme.colors.leaf};
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  span {
    font-family: 'Merriweather', serif;
    font-weight: normal;
    font-style: italic;
  }
  
  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
  
  @media (max-width: 375px) {
    font-size: 0.9rem;
    margin: 1.5rem auto 0;
    padding: 0.6rem 1.2rem;
    min-width: 110px;
  }
`;

const MobileNav = styled.div<{ isOpen: boolean }>`
  display: none;
  @media (max-width: 820px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    width: 80%;
    max-width: 320px;
    height: 100vh;
    padding: 2rem;
    background: ${({ theme }) => theme.colors.background};
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    z-index: 1001;
    transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease-in-out;
    overflow-y: auto;
    & a {
      font-size: 1.5rem;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.textPrimary};
      text-align: center;
      width: 100%;
      padding: 1rem;
      transition: color 0.3s ease, background-color 0.3s ease;
      border-radius: 8px;
      text-decoration: none;
      &:hover {
        color: ${({ theme }) => theme.colors.primary};
        background-color: rgba(0, 0, 0, 0.05);
      }
      @media (max-width: 375px) {
        font-size: 1.3rem;
        padding: 0.75rem;
      }
    }
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 960px;
  margin: 0 auto;
  width: 100%;
`;

const Footer = styled.footer`
  background: ${({ theme }) => theme.colors.background};
  padding: 4rem 2rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: left;
  position: relative;
  overflow: hidden;
  border-top: 2px solid ${({ theme }) => theme.colors.nut};
`;

const FooterGrid = styled.div`
  max-width: 960px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 2rem;
  position: relative;
  z-index: 2;
  align-items: start;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    text-align: center;
    & > div {
      align-items: center;
    }
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterColumnTitle = styled.h3`
  font-family: 'Merriweather', serif;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
`;

const FooterNavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  li a {
    color: ${({ theme }) => theme.colors.textPrimary};
    text-decoration: none;
    transition: color 0.2s;
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  a {
    font-size: 1.5rem;
  }
`;

const Copyright = styled.p`
  margin-bottom: 1.5rem;
  font-size: 0.8rem;
  opacity: 0.7;
  line-height: 1.5;
  a {
    color: inherit;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.2s ease-in-out;
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const AnalyticsNotice = styled.p`
  font-size: 0.8rem;
  opacity: 0.7;
  margin-bottom: 1.5rem;
  line-height: 1.5;
  a {
    color: inherit;
    text-decoration: underline;
    transition: color 0.2s ease-in-out;
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

// --- FINALIZED FOOTER & ANIMATIONS ---
const float1 = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-35px) rotate(15deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;
const float2 = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-25px) rotate(-10deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;
const float3 = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-40px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;
const float4 = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(-15deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;
const float5 = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-35px) rotate(15deg); }
  66% { transform: translateY(10px) rotate(-10deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const float6 = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-40px) rotate(-20deg); }
  66% { transform: translateY(15px) rotate(15deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const float7 = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-50px) rotate(25deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const AnimatedIcon = styled('img')`
  position: absolute;
  opacity: 0.35;
  z-index: 1;
  pointer-events: none;
  /* Lime Icons - Medium Size */
  &:nth-of-type(1),
  &:nth-of-type(4),
  &:nth-of-type(7) {
    width: 70px;
    height: 70px;
  }
  /* Ginger Icons - Medium Size */
  &:nth-of-type(2),
  &:nth-of-type(5),
  &:nth-of-type(8) {
    width: 70px;
    height: 70px;
  }
  /* Blueberry Icons - Small Size */
  &:nth-of-type(3),
  &:nth-of-type(6),
  &:nth-of-type(9) {
    width: 50px;
    height: 50px;
  }
  /* Orange Icons - Large Size */
  &:nth-of-type(10),
  &:nth-of-type(11),
  &:nth-of-type(12) {
    width: 80px;
    height: 80px;
  }
  /* Almond Icons - Medium Size */
  &:nth-of-type(13),
  &:nth-of-type(14),
  &:nth-of-type(15) {
    width: 50px;
    height: 50px;
  }
  /* Raspberry Icons - Small Size */
  &:nth-of-type(16),
  &:nth-of-type(17),
  &:nth-of-type(18) {
    width: 70px;
    height: 70px;
  }
  
  /* Individual Icon Positions and Animations */
  &:nth-of-type(1) { top: 15%; left: 5%; animation: ${float1} 16s ease-in-out infinite; animation-delay: -2s; }
  &:nth-of-type(2) { bottom: 20%; left: 12%; animation: ${float2} 18s ease-in-out infinite; animation-delay: -5s; }
  &:nth-of-type(3) { top: 10%; left: 25%; animation: ${float3} 13s ease-in-out infinite; animation-delay: -8s; }
  &:nth-of-type(4) { bottom: 15%; left: 35%; animation: ${float4} 20s ease-in-out infinite; animation-delay: -1s; }
  &:nth-of-type(5) { top: 20%; left: 48%; animation: ${float5} 17s ease-in-out infinite; animation-delay: -12s; }
  &:nth-of-type(6) { bottom: 10%; left: 55%; animation: ${float1} 19s ease-in-out infinite; animation-delay: -3s; }
  &:nth-of-type(7) { top: 15%; right: 30%; animation: ${float2} 14s ease-in-out infinite; animation-delay: -7s; }
  &:nth-of-type(8) { bottom: 25%; right: 20%; animation: ${float3} 18s ease-in-out infinite; animation-delay: -11s; }
  &:nth-of-type(9) { top: 5%; right: 10%; animation: ${float4} 15s ease-in-out infinite; animation-delay: -6s; }
  &:nth-of-type(10) { bottom: 5%; left: 20%; animation: ${float5} 21s ease-in-out infinite; animation-delay: -4s; }
  &:nth-of-type(11) { bottom: 15%; right: 25%; animation: ${float1} 16s ease-in-out infinite; animation-delay: -9s; }
  &:nth-of-type(12) { top: 10%; right: 35%; animation: ${float5} 20s ease-in-out infinite; animation-delay: -7s; }
  &:nth-of-type(13) { top: 30%; right: 40%; animation: ${float6} 19s ease-in-out infinite; animation-delay: -7s; opacity: 0.4; }
  &:nth-of-type(14) { bottom: 30%; left: 45%; animation: ${float6} 22s ease-in-out infinite; animation-delay: -14s; opacity: 0.4; }
  &:nth-of-type(15) { top: 25%; left: 15%; animation: ${float6} 21s ease-in-out infinite; animation-delay: -11s; opacity: 0.4; }
  &:nth-of-type(16) { bottom: 20%; right: 15%; animation: ${float7} 18s ease-in-out infinite; animation-delay: -6s; opacity: 0.35; }
  &:nth-of-type(17) { top: 15%; left: 20%; animation: ${float7} 20s ease-in-out infinite; animation-delay: -8s; opacity: 0.35; }
  &:nth-of-type(18) { bottom: 10%; left: 30%; animation: ${float7} 22s ease-in-out infinite; animation-delay: -10s; opacity: 0.35; }
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textPrimary};
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
  }
  @media (max-width: 820px) {
    font-size: 0.85rem;
  }
`;

interface LayoutProps {
  children: ReactNode;
}

const animatedIcons = [
  iconLime, iconGinger, iconBlueberry,
  iconLime, iconGinger, iconBlueberry,
  iconLime, iconGinger, iconBlueberry,
  iconOrange, iconOrange, iconOrange,
  iconAlmond, iconAlmond, iconAlmond,
  iconRaspberry, iconRaspberry, iconRaspberry
];


export const Layout = ({ children }: LayoutProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

    useEffect(() => {
    if (window?.location?.hostname !== 'localhost' && process.env.CLARITY_PROJECT_ID) {
      Clarity.init(process.env.CLARITY_PROJECT_ID);
    }
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <ThemeProvider>
      <Seo />
      <SiteWrapper>
        <Header>
          <LogoContainer to="/">
            <LogoImg src={logo} alt="Mindful and Moreish Logo" />
            <TitleContainer>
              <HandwritingTitle>Mindful and Moreish</HandwritingTitle>
              <Tagline>Mindful Meals. Moreish Moments.</Tagline>
            </TitleContainer>
          </LogoContainer>
          <Nav>
            <NavLink to="/">Recipes</NavLink>
            <NavLink to="/about">About</NavLink>
          </Nav>
          <MobileMenuButton 
            onClick={() => setIsNavOpen(!isNavOpen)} 
            aria-label={isNavOpen ? "Close menu" : "Open menu"}
          >
            {isNavOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuButton>
        </Header>
        <MobileNav isOpen={isNavOpen}>
          <NavLink to="/" onClick={() => setIsNavOpen(false)}>Recipes</NavLink>
          <NavLink to="/about" onClick={() => setIsNavOpen(false)}>About</NavLink>
          <CloseButton 
            onClick={() => setIsNavOpen(false)}
            aria-label="Close menu"
          >
            <FaTimes />
            <span>Close</span>
          </CloseButton>
        </MobileNav>
        <Main>{children}</Main>
        <Footer>
          {animatedIcons.map((iconSrc, index) => (
            <AnimatedIcon key={index} src={iconSrc} alt="" />
          ))}
          <FooterGrid>
            <FooterColumn>
              <Copyright>© {new Date().getFullYear()} <Link to="/">Mindful and Moreish</Link>.<br/>All Rights Reserved.</Copyright>
              <AnalyticsNotice>
                This site uses Microsoft Clarity to collect analytics data and help improve user experience. Learn more in our <Link to="/privacy">Privacy Policy</Link>.
              </AnalyticsNotice>
            </FooterColumn>
            <FooterColumn>
              <FooterColumnTitle>Explore</FooterColumnTitle>
              <FooterNavList>
                <li><Link to="/">Recipes</Link></li>
                <li><Link to="/about">About</Link></li>
              </FooterNavList>
            </FooterColumn>
            <FooterColumn>
              <FooterColumnTitle>Legal</FooterColumnTitle>
              <FooterNavList>
                <li><Link to="/terms">Terms and Disclaimer</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
              </FooterNavList>
            </FooterColumn>
            <FooterColumn>
              <FooterColumnTitle>Connect</FooterColumnTitle>
              <SocialLinks>
                <FooterLink to="mailto:info@mindfulandmoreish.com"><FaRegEnvelope /></FooterLink>
                <FooterLink to="https://instagram.com/mindfulandmoreish" target="_blank" rel="noopener noreferrer"><FaInstagram /></FooterLink>
                <FooterLink to="https://github.com/gdcodes/mindfulandmoreish" target="_blank" rel="noopener noreferrer"><FaGithub /></FooterLink>
              </SocialLinks>
            </FooterColumn>
          </FooterGrid>
        </Footer>
      </SiteWrapper>
    </ThemeProvider>
  );
}; 