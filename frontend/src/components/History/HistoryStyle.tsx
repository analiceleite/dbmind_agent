import styled from 'styled-components';

export const HistoryContainer = styled.div`
  position: fixed;
  right: 20px;
  top: 80px;
  bottom: 7rem;
  width: 360px;
  /* use full available area between top and bottom and let inner content scroll */
  display: flex;
  flex-direction: column;
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
  /* allow the wrapper to fill remaining space inside the container so all items can render and scroll */
  flex: 1 1 auto;
  min-height: 0;
`;

export const SearchWrapper = styled.div`
  padding: 10px 16px;
  border-bottom: 1px solid ${p => p.theme.borderPrimary};
  background: ${p => p.theme.bgPrimary};
  display:flex;
  gap:8px;
  align-items:center;
`;

export const SearchInput = styled.input`
  flex: 1 1 auto;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid ${p => p.theme.borderPrimary};
  background: ${p => p.theme.bgTertiary};
  color: ${p => p.theme.textPrimary};
  font-size: 14px;
  outline: none;
  &:focus { box-shadow: 0 4px 18px rgba(0,0,0,0.08); }
`;

export const ClearButton = styled.button`
  background: transparent;
  border: none;
  color: ${p => p.theme.textSecondary};
  cursor: pointer;
  font-weight: 600;
  padding: 6px 8px;
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
  cursor: pointer;
  &:hover { color: ${p => p.theme.textAccent}; }
`;

export const AnswerPreview = styled.div`
  font-size: 13px;
  color: ${props => props.theme.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const HistoryTimestamp = styled.div`
  font-size: 12px;
  color: ${p => p.theme.textSecondary};
`;

export const EmptyWrapper = styled.div`
  padding: 24px;
  display:flex;
  align-items:center;
  justify-content:center;
`;

export const EmptyText = styled.div`
  color: ${p => p.theme.textSecondary};
  padding: 8px 12px;
`;

export const NoResultsWrapper = styled.div`
  padding: 24px;
  text-align: center;
  color: ${p => p.theme.textSecondary};
`;

export const NoResultsIcon = styled.div`
  font-size: 36px;
  line-height: 1;
  margin-bottom: 10px;
`;

export const NoResultsTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 8px;
  color: ${p => p.theme.textPrimary};
`;

export const NoResultsSubtitle = styled.div`
  font-size: 13px;
  margin-bottom: 14px;
  color: ${p => p.theme.textSecondary};
`;

export const NoResultsActions = styled.div``;
