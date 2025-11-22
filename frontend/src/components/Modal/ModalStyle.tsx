import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 300;
`;

export const Dialog = styled.div`
  width: 520px;
  max-width: calc(100% - 40px);
  background: ${p => p.theme.bgPrimary};
  border: 1px solid ${p => p.theme.borderPrimary};
  border-radius: 12px;
  box-shadow: 0 18px 60px rgba(2,6,23,0.45);
  overflow: hidden;
  transform: translateY(-6px) scale(0.995);
  animation: modalEnter 180ms ease forwards;

  @keyframes modalEnter {
    from { opacity: 0; transform: translateY(-6px) scale(0.995); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
`;

export const DialogHeader = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding: 12px 16px;
  border-bottom: 1px solid ${p => p.theme.borderPrimary};
`;

export const DialogTitle = styled.div`
  font-weight:700;
  color: ${p => p.theme.textPrimary};
`;

export const CloseIcon = styled.button`
  background: transparent;
  border: none;
  color: ${p => p.theme.textSecondary};
  cursor: pointer;
  font-size: 18px;
  padding: 6px;
  border-radius: 6px;
  transition: background 0.12s ease, color 0.12s ease;
  &:hover { background: ${p => p.theme.bgSecondary}; color: ${p => p.theme.textPrimary}; }
`;

export const DialogBody = styled.div`
  padding: 16px;
  color: ${p => p.theme.textSecondary};

  input, textarea, select {
    width: 100%;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid ${p => p.theme.borderPrimary};
    background: ${p => p.theme.bgTertiary};
    color: ${p => p.theme.textPrimary};
    outline: none;
    font-size: 14px;
  }

  textarea { resize: vertical; }

  label { font-size: 13px; color: ${p => p.theme.textSecondary}; }
`;

export const DialogFooter = styled.div`
  display:flex;
  gap:8px;
  justify-content:flex-end;
  padding: 12px 16px;
  border-top: 1px solid ${p => p.theme.borderPrimary};
  background: ${p => p.theme.bgPrimary};
`;

export const Button = styled.button<{ kind?: 'primary' | 'ghost' }>`
  padding: 8px 14px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  border: 1px solid ${p => p.theme.borderPrimary};
  background: ${p => p.kind === 'primary' ? p.theme.textAccent : 'transparent'};
  color: ${p => p.kind === 'primary' ? '#fff' : p.theme.textSecondary};
  box-shadow: ${p => p.kind === 'primary' ? '0 6px 18px rgba(0,0,0,0.12)' : 'none'};
  transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;
  &:hover { transform: translateY(-1px); }
  &:focus { outline: 3px solid ${p => p.theme.textAccent}30; }
`;

export default Dialog;
