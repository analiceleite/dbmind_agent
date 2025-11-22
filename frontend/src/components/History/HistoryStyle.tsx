import styled from 'styled-components';

export const HistoryContainer = styled.div`
  position: fixed;
  right: 20px;
  top: 80px;
  width: 360px;
  max-height: calc(100vh - 160px);
  background: ${props => props.theme.bgTertiary};
  border-radius: 10px;
  border: 1px solid ${props => props.theme.borderPrimary};
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
  overflow: hidden;
  z-index: 200;
  transition: all 0.2s ease;
`;

export const HistoryHeader = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding: 12px 16px;
  border-bottom: 1px solid ${props => props.theme.borderPrimary};
  background: ${props => props.theme.bgPrimary};
  color: ${props => props.theme.textPrimary};
  font-weight: 700;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.theme.textSecondary};
  cursor: pointer;
  font-weight: 600;
`;

export const HistoryListWrapper = styled.div`
  overflow-y: auto;
  max-height: calc(100vh - 220px);
`;

export const HistoryListItem = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid ${props => props.theme.borderPrimary};
  cursor: default;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: background 0.15s ease;
  &:hover { background: ${props => props.theme.bgSecondary}; }
`;

export const HistoryMeta = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap: 8px;
`;

export const HistoryActions = styled.div`
  display:flex;
  gap:8px;
  align-items:center;
`;

export const ActionButton = styled.button`
  border: 1px solid ${props => props.theme.borderPrimary};
  background: transparent;
  color: ${props => props.theme.textSecondary};
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.15s ease;
  &:hover { background: ${props => props.theme.textAccent}20; color: ${props => props.theme.textAccent}; }
`;

export const QuestionText = styled.div`
  font-weight: 600;
  color: ${props => props.theme.textPrimary};
`;

export const AnswerPreview = styled.div`
  font-size: 13px;
  color: ${props => props.theme.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
