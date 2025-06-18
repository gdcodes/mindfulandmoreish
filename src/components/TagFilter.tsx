/** @jsxRuntime classic */
/** @jsx jsx */
/** @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { Transition } from 'react-transition-group';
import { css, useTheme } from '@emotion/react';

const ANIMATION_DURATION = 300;

interface PopoverContainerProps {
  state: string;
}

interface PopoverContainerProps {
  state: string;
  theme?: any;
}

const PopoverContainer = styled.div<PopoverContainerProps>(({ theme, state }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  background: theme.colors.background,
  borderRadius: '24px 24px 0 0',
  boxShadow: `0 -8px 30px ${theme.colors.shadow}`,
  padding: '1.5rem 1.25rem',
  paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))',
  zIndex: 9999,
  maxHeight: '90vh',
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid ${theme.colors.gray.light}`,
  transition: `all ${ANIMATION_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1)`,
  ...(state === 'entering' || state === 'entered' 
    ? {
        transform: 'translateY(0)',
        opacity: 1
      }
    : {
        transform: 'translateY(100%)',
        opacity: 0
      }
  ),
  '@media (min-width: 768px)': {
    position: 'absolute',
    top: 'calc(100% + 0.5rem)',
    bottom: 'auto',
    left: 0,
    right: 'auto',
    width: '320px',
    maxHeight: '400px',
    borderRadius: '12px',
    boxShadow: `0 10px 25px ${theme.colors.shadow}`,
    ...(state === 'entering' || state === 'entered'
      ? {
          transform: 'translateY(0)',
          opacity: 1
        }
      : {
          transform: 'translateY(-10px)',
          opacity: 0
        }
    )
  }
}));

interface BackdropProps {
  state: string;
  theme?: any;
}

const Backdrop = styled.div<BackdropProps>(({ theme, state }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 9998,
  transition: `opacity ${ANIMATION_DURATION}ms ease`,
  pointerEvents: (state === 'entering' || state === 'entered') ? 'auto' : 'none',
  ...(state === 'entering' || state === 'entered' 
    ? { opacity: 1 }
    : { opacity: 0 }
  ),
  '@media (min-width: 768px)': {
    backgroundColor: 'transparent',
    pointerEvents: 'none',
  }
}));

interface FilterButtonProps {
  isActive?: boolean;
  theme?: any;
}

const FilterButton = styled.button<FilterButtonProps>(({ theme, isActive }) => ({
  display: 'block',
  width: '100%',
  padding: '0.75rem 1.25rem 0.75rem 1rem',
  background: theme.colors.white,
  border: `2px solid ${isActive ? theme.colors.primary : theme.colors.gray.light}`,
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: 500,
  color: theme.colors.text,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  textAlign: 'left',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  '&:hover, &:focus': {
    borderColor: theme.colors.primary,
    outline: 'none',
    boxShadow: `0 0 0 2px ${theme.colors.primary}20`,
  },
  '& svg': {
    flexShrink: 0,
  }
}));

interface TagFilterProps {
  availableTags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearAll: () => void;
}

export const TagFilter: React.FC<TagFilterProps> = ({
  availableTags,
  selectedTags,
  onTagToggle,
  onClearAll,
}) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        nodeRef.current && 
        !nodeRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  return (
    <div style={{ position: 'relative', width: '100%' }} ref={nodeRef}>
      <FilterButton
        ref={buttonRef}
        isActive={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        data-testid="tag-filter-button"
        aria-label="Filter by tags"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          <span>
            {selectedTags.length > 0 ? `Tags (${selectedTags.length})` : 'Filter by Tags'}
          </span>
        </div>
      </FilterButton>

      <Transition
        in={isOpen}
        timeout={ANIMATION_DURATION}
        mountOnEnter
        unmountOnExit
      >
        {(state) => (
          <>
            <Backdrop 
              state={state} 
              onClick={() => setIsOpen(false)}
              data-testid="tag-filter-backdrop"
            />
            <PopoverContainer 
              state={state} 
              data-testid="tag-filter-popover"
            >
              <div css={css({
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '1rem'
              })}>
                <h3 css={css({
                  margin: 0, 
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: theme.colors.text
                })}>
                  Filter by Tags
                </h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  css={css({
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    padding: '0.25rem',
                    color: theme.colors.text
                  })}
                >
                  ×
                </button>
              </div>

              <div css={css({
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                gap: '0.75rem',
                overflowY: 'auto',
                padding: '0.25rem',
                marginBottom: '1rem'
              })}>
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    title={tag}
                    onClick={() => onTagToggle(tag)}
                    css={css({
                      padding: '0.5rem 0.75rem',
                      borderRadius: '9999px',
                      border: `2px solid ${
                        selectedTags.includes(tag) 
                          ? theme.colors.primary 
                          : theme.colors.gray.light
                      }`,
                      background: theme.colors.white,
                      color: theme.colors.text,
                      cursor: 'pointer',
                      fontWeight: 400,
                      transition: 'all 0.2s ease',
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      '&:hover': {
                        borderColor: theme.colors.primary,
                        transform: 'translateY(-1px)'
                      }
                    })}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {selectedTags.length > 0 && (
                <button
                  onClick={() => {
                    onClearAll();
                    setIsOpen(false);
                  }}
                  css={css({
                    background: 'none',
                    border: 'none',
                    color: theme.colors.primary,
                    padding: '0.75rem',
                    marginTop: '0.5rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'center',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  })}
                >
                  Clear all filters
                </button>
              )}
            </PopoverContainer>
          </>
        )}
      </Transition>
    </div>
  );
};