import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 1.5rem;
  background: ${props => props.theme.bgPrimary};
  border-bottom: 1px solid ${props => props.theme.borderPrimary};
  transition: all 0.3s ease;
`;

export const Logo = styled.img<{ $isDark: boolean }>`
  height: 30px;
  width: 200px;
  filter: ${props => props.$isDark ? 'none' : 'brightness(0) saturate(100%)'};
`;

export const Title = styled.h1`
  flex: 1;
  text-align: center;
  font-size: 1.3rem;
  color: ${props => props.theme.textPrimary};
  font-family: "Nebula", sans-serif;
`;

export const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ControlButton = styled.button<{ $visible?: boolean }>`
  background: transparent;
  border: none;
  color: ${props => props.theme.textSecondary};
  padding: 0.6rem;
  cursor: pointer;
  font-size: 1rem;
  transition: opacity 220ms ease, transform 220ms ease, color 160ms ease, background 160ms ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  opacity: ${p => (p.$visible === false ? 0 : 1)};
  transform: ${p => (p.$visible === false ? 'translateY(-6px) scale(0.98)' : 'translateY(0) scale(1)')};
  pointer-events: ${p => (p.$visible === false ? 'none' : 'auto')};

  &:hover {
    background: ${props => props.theme.bgSecondary};
    border-color: ${props => props.theme.textAccent};
    color: ${props => props.theme.textAccent};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export const StatusIndicator = styled.div<{ $isConnected: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: ${props => props.$isConnected ? '#10b981' : '#ef4444'};
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.4rem 0.8rem;
  background: ${props => props.$isConnected ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
  border: 1px solid ${props => props.$isConnected ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
  transition: all 0.3s ease;
`;