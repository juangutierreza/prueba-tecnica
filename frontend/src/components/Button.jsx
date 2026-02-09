import styled, { css } from 'styled-components';

const variantStyles = {
  primary: css`background: #4299e1; color: white;`,
  secondary: css`background: #e2e8f0; color: #4a5568;`,
  danger: css`background: #fc8181; color: white;`,
};

export const Button = styled.button`
  padding: ${({ $size }) => ($size === 'sm' ? '0.3rem 0.6rem' : '0.5rem 1rem')};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: ${({ $size }) => ($size === 'sm' ? '0.75rem' : '0.85rem')};
  font-weight: 500;
  transition: opacity 0.2s;
  ${({ $variant }) => variantStyles[$variant] || variantStyles.primary}

  &:hover {
    opacity: 0.85;
  }
`;

export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0.35rem;
  border-radius: 6px;
  cursor: pointer;
  color: #a0aec0;
  transition: color 0.2s, background 0.2s;

  &:hover {
    background: #f7fafc;
  }

  ${({ $variant }) =>
    $variant === 'danger' &&
    css`
      &:hover {
        color: #e53e3e;
        background: #fff5f5;
      }
    `}
`;
