import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 1rem;
`;

const Dialog = styled.div`
  background: white;
  border-radius: 10px;
  width: 100%;
  max-width: 520px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  animation: ${fadeIn} 0.2s ease-out;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #e2e8f0;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.1rem;
  color: #1a202c;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.4rem;
  color: #a0aec0;
  cursor: pointer;
  padding: 0;
  line-height: 1;

  &:hover {
    color: #4a5568;
  }
`;

const Body = styled.div`
  padding: 1.25rem;
`;

export function Modal({ title, onClose, children }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <Backdrop onClick={handleBackdropClick}>
      <Dialog role="dialog" aria-modal="true" aria-label={title}>
        <Header>
          <Title>{title}</Title>
          <CloseButton onClick={onClose} aria-label="Cerrar">
            &times;
          </CloseButton>
        </Header>
        <Body>{children}</Body>
      </Dialog>
    </Backdrop>
  );
}
