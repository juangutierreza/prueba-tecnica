import styled from 'styled-components';

export const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #718096;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #718096;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #e53e3e;
  background: #fff5f5;
  border-radius: 8px;
  margin-bottom: 1rem;
`;
