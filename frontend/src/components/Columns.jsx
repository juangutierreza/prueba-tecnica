import styled from 'styled-components';

export const Columns = styled.div`
  display: grid;
  grid-template-columns: ${({ $template }) => $template};
  gap: ${({ $gap }) => $gap || '1rem'};
`;
