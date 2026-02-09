import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { tasksApi } from '../services/api';

const STATUS_LABELS = {
  pending: 'Pendientes',
  in_progress: 'En progreso',
  completed: 'Completadas',
};

const statusColors = {
  pending: '#ecc94b',
  in_progress: '#4299e1',
  completed: '#48bb78',
};

const Container = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const StatBox = styled.div`
  flex: 1;
  min-width: 100px;
  text-align: center;
  padding: 0.75rem;
  border-radius: 8px;
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  ${({ $status }) =>
    $status &&
    css`
      border-left: 3px solid ${statusColors[$status]};
    `}
`;

const Number = styled.span`
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
`;

const Label = styled.span`
  font-size: 0.75rem;
  color: #718096;
  text-transform: uppercase;
`;

export function TaskStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    tasksApi.getStats().then(setStats).catch(console.error);
  }, []);

  if (!stats) return null;

  return (
    <Container>
      <StatBox>
        <Number>{stats.total}</Number>
        <Label>Total</Label>
      </StatBox>
      {stats.byStatus.map((s) => (
        <StatBox key={s.status} $status={s.status}>
          <Number>{s.count}</Number>
          <Label>{STATUS_LABELS[s.status] || s.status}</Label>
        </StatBox>
      ))}
    </Container>
  );
}
