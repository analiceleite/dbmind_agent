import styled from 'styled-components';

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
  
  svg {
    transition: all 0.3s ease;
  }
`;