import React from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

type HerbVariant = 'basil' | 'mint' | 'sprig';

type HerbLeaf = {
  key: string;
  variant: HerbVariant;
  top: string;
  offset: string;
  size: string;
  yOffset: string;
  rotation: string;
  color: string;
  delay: string;
  duration: string;
};

type LeafStyle = React.CSSProperties & {
  '--top': string;
  '--x-offset': string;
  '--y-offset': string;
  '--size': string;
  '--base-rotate': string;
  '--leaf-color': string;
  '--bob-delay': string;
  '--bob-duration': string;
};

const herbLeaves: HerbLeaf[] = [
  {
    key: 'basil-large',
    variant: 'basil',
    top: '9%',
    offset: '18px',
    size: '78px',
    yOffset: '0px',
    rotation: '-22deg',
    color: '#7A9E7E',
    delay: '-1s',
    duration: '8s',
  },
  {
    key: 'mint-sprig',
    variant: 'mint',
    top: '36%',
    offset: '44px',
    size: '86px',
    yOffset: '32px',
    rotation: '16deg',
    color: '#A3C96B',
    delay: '-4s',
    duration: '9s',
  },
  {
    key: 'sage-leaf',
    variant: 'sprig',
    top: '66%',
    offset: '22px',
    size: '72px',
    yOffset: '-18px',
    rotation: '-10deg',
    color: '#6F9B73',
    delay: '-7s',
    duration: '10s',
  },
  {
    key: 'small-basil',
    variant: 'basil',
    top: '82%',
    offset: '70px',
    size: '54px',
    yOffset: '24px',
    rotation: '29deg',
    color: '#8EB984',
    delay: '-3s',
    duration: '7s',
  },
];

const bob = keyframes`
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-12px) rotate(7deg);
  }
`;

const LeafOverlay = styled.div`
  --leaf-left-shift: 0px;
  --leaf-right-shift: 0px;
  --leaf-rise: 0px;
  --leaf-spin-left: 0deg;
  --leaf-spin-right: 0deg;

  position: fixed;
  inset: clamp(96px, 12vh, 136px) 0 1.5rem;
  pointer-events: none;
  z-index: 5;

  @media (max-width: 900px) {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

const LeafRail = styled.div<{ $side: 'left' | 'right' }>`
  position: absolute;
  top: 0;
  bottom: 0;
  width: min(13vw, 164px);
  ${({ $side }) => ($side === 'left' ? 'left: 0;' : 'right: 0;')}
  --side-shift: ${({ $side }) =>
    $side === 'left' ? 'var(--leaf-left-shift)' : 'var(--leaf-right-shift)'};
  --side-spin: ${({ $side }) =>
    $side === 'left' ? 'var(--leaf-spin-left)' : 'var(--leaf-spin-right)'};

  @media (max-width: 1180px) {
    opacity: 0.42;
    width: 86px;
  }
`;

const LeafTrack = styled.div`
  position: absolute;
  top: var(--top);
  width: var(--size);
  height: var(--size);
  color: var(--leaf-color);
  opacity: 0.58;
  filter: drop-shadow(0 8px 14px rgba(47, 47, 47, 0.08));
  transform: translate3d(
      calc(var(--x-offset) + var(--side-shift)),
      calc(var(--y-offset) + var(--leaf-rise)),
      0
    )
    rotate(calc(var(--base-rotate) + var(--side-spin)));
  will-change: transform;

  ${LeafRail}:first-of-type & {
    left: 0;
  }

  ${LeafRail}:last-of-type & {
    right: 0;
  }
`;

const LeafBob = styled.div`
  width: 100%;
  height: 100%;
  animation: ${bob} var(--bob-duration) ease-in-out infinite;
  animation-delay: var(--bob-delay);

  svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }
`;

const createLeafStyle = (leaf: HerbLeaf): LeafStyle => ({
  '--top': leaf.top,
  '--x-offset': leaf.offset,
  '--y-offset': leaf.yOffset,
  '--size': leaf.size,
  '--base-rotate': leaf.rotation,
  '--leaf-color': leaf.color,
  '--bob-delay': leaf.delay,
  '--bob-duration': leaf.duration,
});

const HerbIcon = ({ variant }: { variant: HerbVariant }) => {
  if (variant === 'mint') {
    return (
      <svg viewBox="0 0 96 96" focusable="false">
        <path
          d="M47 87C50 61 52 35 49 9"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="4"
        />
        <ellipse cx="35" cy="27" rx="12" ry="20" fill="currentColor" opacity="0.72" transform="rotate(-34 35 27)" />
        <ellipse cx="62" cy="35" rx="13" ry="21" fill="currentColor" opacity="0.82" transform="rotate(38 62 35)" />
        <ellipse cx="32" cy="56" rx="14" ry="22" fill="currentColor" opacity="0.78" transform="rotate(-44 32 56)" />
        <ellipse cx="61" cy="66" rx="12" ry="20" fill="currentColor" opacity="0.68" transform="rotate(34 61 66)" />
      </svg>
    );
  }

  if (variant === 'sprig') {
    return (
      <svg viewBox="0 0 96 96" focusable="false">
        <path
          d="M24 82C36 63 49 45 73 16"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="4"
        />
        <path d="M34 67C16 63 14 48 31 45C43 44 46 55 34 67Z" fill="currentColor" opacity="0.72" />
        <path d="M47 49C31 42 33 29 48 29C60 30 61 42 47 49Z" fill="currentColor" opacity="0.8" />
        <path d="M62 31C48 24 51 11 66 12C78 15 76 26 62 31Z" fill="currentColor" opacity="0.7" />
        <path d="M55 56C72 55 80 67 68 75C56 81 49 69 55 56Z" fill="currentColor" opacity="0.64" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 96 96" focusable="false">
      <path
        d="M50 88C75 69 87 44 78 19C52 17 29 32 18 57C34 61 44 70 50 88Z"
        fill="currentColor"
        opacity="0.72"
      />
      <path
        d="M50 88C51 63 58 43 76 20"
        fill="none"
        stroke="rgba(250, 247, 240, 0.74)"
        strokeLinecap="round"
        strokeWidth="3"
      />
      <path
        d="M46 65C39 58 31 55 20 57M54 52C61 49 68 43 75 33"
        fill="none"
        stroke="rgba(250, 247, 240, 0.58)"
        strokeLinecap="round"
        strokeWidth="2.5"
      />
    </svg>
  );
};

const RecipeScrollLeaves: React.FC = () => {
  const overlayRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) {
      return undefined;
    }

    const reducedMotion = typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : { matches: false };
    let frame = 0;

    const updateLeaves = () => {
      frame = 0;

      if (reducedMotion.matches) {
        return;
      }

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
      const wave = Math.sin(progress * Math.PI * 2);

      overlay.style.setProperty('--leaf-left-shift', `${Math.round(wave * 18)}px`);
      overlay.style.setProperty('--leaf-right-shift', `${Math.round(wave * -18)}px`);
      overlay.style.setProperty('--leaf-rise', `${Math.round(progress * -150)}px`);
      overlay.style.setProperty('--leaf-spin-left', `${Math.round(progress * 118)}deg`);
      overlay.style.setProperty('--leaf-spin-right', `${Math.round(progress * -118)}deg`);
    };

    const requestUpdate = () => {
      if (frame !== 0) {
        return;
      }

      if (typeof window.requestAnimationFrame !== 'function') {
        updateLeaves();
        return;
      }

      frame = window.requestAnimationFrame(updateLeaves);
    };

    updateLeaves();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);

      if (frame !== 0 && typeof window.cancelAnimationFrame === 'function') {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <LeafOverlay
      ref={overlayRef}
      aria-hidden="true"
      data-test-id="recipe-scroll-leaves"
    >
      <LeafRail $side="left">
        {herbLeaves.map((leaf) => (
          <LeafTrack key={leaf.key} style={createLeafStyle(leaf)}>
            <LeafBob>
              <HerbIcon variant={leaf.variant} />
            </LeafBob>
          </LeafTrack>
        ))}
      </LeafRail>
      <LeafRail $side="right">
        {herbLeaves.map((leaf) => (
          <LeafTrack key={leaf.key} style={createLeafStyle(leaf)}>
            <LeafBob>
              <HerbIcon variant={leaf.variant} />
            </LeafBob>
          </LeafTrack>
        ))}
      </LeafRail>
    </LeafOverlay>
  );
};

export default RecipeScrollLeaves;
