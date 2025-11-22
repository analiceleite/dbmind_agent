import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% {
    transform: scale(0.8);
    background-color: #b3d4fc;
    box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
  }

  50% {
    transform: scale(1.2);
    background-color: #6793fb;
    box-shadow: 0 0 0 10px rgba(178, 212, 252, 0);
  }

  100% {
    transform: scale(0.8);
    background-color: #b3d4fc;
    box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 6px;
  height: auto;
  width: auto;
`;

const Dot = styled.div<{ delay?: string }>`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: #b3d4fc;
  animation: ${pulse} 1.2s infinite ease-in-out;
  animation-delay: ${p => p.delay ?? '0s'};
`;

export const DotsLoader = () => (
  <Container aria-hidden="true">
    <Dot delay="-0.24s" />
    <Dot delay="-0.08s" />
    <Dot delay="0.08s" />
  </Container>
);

export default DotsLoader;
