import React from 'react';
import styled from 'styled-components';
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ScrapbookPhoto = styled.div<{ rotation: number }>`
  position: relative;
  background: ${({ theme }) => theme.colors.white};
  padding: 0;
  border-radius: 18px 40px 28px 18px/28px 18px 40px 18px;
  box-shadow: 0 8px 24px rgba(80, 227, 194, 0.13);
  overflow: visible;
  clip-path: polygon(6% 0, 94% 0, 100% 10%, 100% 90%, 94% 100%, 6% 100%, 0 90%, 0 10%);
  transform: rotate(${({ rotation }) => rotation}deg);
  margin-bottom: 1.5rem;
`;

const WashiTape = styled.div<{ color: string; top?: string; left?: string; right?: string; bottom?: string; rotate?: string }>`
  position: absolute;
  width: 60px;
  height: 22px;
  background: ${({ color }) => color};
  border-radius: 8px 18px 8px 18px;
  box-shadow: 0 2px 8px rgba(80, 227, 194, 0.10);
  opacity: 0.85;
  z-index: 2;
  ${({ top }) => top && `top: ${top};`}
  ${({ left }) => left && `left: ${left};`}
  ${({ right }) => right && `right: ${right};`}
  ${({ bottom }) => bottom && `bottom: ${bottom};`}
  ${({ rotate }) => rotate && `transform: rotate(${rotate});`}
`;

interface PhotoGalleryProps {
  photos: {
    gatsbyImageData: IGatsbyImageData;
    description: string;
  }[];
}

export const PhotoGallery = ({ photos }: PhotoGalleryProps) => {
  const rotations = [-2, 3, -1, 4, -3, 2];

  return (
    <GalleryContainer>
      {photos.map((photo, index) => {
        const image = getImage(photo.gatsbyImageData);
        if (!image) return null;
        
        const rotation = rotations[index % rotations.length];
        // Pick random washi tape positions/colors for each photo
        const washiTapes = [
          { color: '#F5A623', top: '-12px', left: '18px', rotate: '-8deg' },
          { color: '#50E3C2', top: '-10px', right: '18px', rotate: '7deg' },
          { color: '#E8F5E9', bottom: '-12px', left: '22px', rotate: '5deg' },
          { color: '#F9F7FD', bottom: '-10px', right: '22px', rotate: '-6deg' },
        ];
        const tape1 = washiTapes[index % washiTapes.length];
        const tape2 = washiTapes[(index + 2) % washiTapes.length];
        return (
          <ScrapbookPhoto key={index} rotation={rotation}>
            <WashiTape {...tape1} />
            <WashiTape {...tape2} />
            <GatsbyImage image={image} alt={photo.description || 'Recipe photo'} style={{ borderRadius: '16px', boxShadow: '0 2px 12px #e0e0e0' }} />
          </ScrapbookPhoto>
        );
      })}
    </GalleryContainer>
  );
}; 