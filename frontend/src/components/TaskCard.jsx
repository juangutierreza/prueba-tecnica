import styled, { css } from 'styled-components';
import { TrashIcon } from '../assets/icons';

const PRIORITY_COLORS = {
  high: '#fc8181',
  medium: '#ecc94b',
  low: '#9ae6b4',
};

const STATUS_LABELS = {
  pending: 'Pendiente',
  in_progress: 'En progreso',
  completed: 'Completada',
};

const PRIORITY_LABELS = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
};

const Card = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  border-left: 4px solid ${({ $priority }) => PRIORITY_COLORS[$priority] || '#e2e8f0'};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1rem;
`;

const Description = styled.p`
  color: #718096;
  font-size: 0.85rem;
  margin: 0 0 0.5rem;
`;

const Meta = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-size: 0.75rem;
`;

const UserName = styled.span`
  color: #718096;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DeleteButton = styled(IconButton)`
  margin-left: auto;
`;

const badgeColors = {
  pending: css`
    background: #fefcbf;
    color: #975a16;
  `,
  in_progress: css`
    background: #bee3f8;
    color: #2a4365;
  `,
  completed: css`
    background: #c6f6d5;
    color: #276749;
  `,
};

const Badge = styled.span`
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  ${({ $status }) => badgeColors[$status]}
`;

const priorityColors = {
  high: '#e53e3e',
  medium: '#d69e2e',
  low: '#38a169',
};

const Priority = styled.span`
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ $level }) => priorityColors[$level]};
`;

export function TaskCard({ task, onEdit, onStatusChange, onDelete }) {
  return (
    <Card $priority={task.priority}>
      <Header>
        <Title>{task.title}</Title>
        <Badge $status={task.status}>{STATUS_LABELS[task.status]}</Badge>
      </Header>

      {task.description && <Description>{task.description}</Description>}

      <Meta>
        <Priority $level={task.priority}>{PRIORITY_LABELS[task.priority]}</Priority>
        {task.user_name && <UserName>{task.user_name}</UserName>}
      </Meta>

      <Actions>
        {task.status !== 'completed' && (
          <Button
            $variant="primary"
            $size="sm"
            onClick={() =>
              onStatusChange(task.id, {
                status: task.status === 'pending' ? 'in_progress' : 'completed',
              })
            }
          >
            {task.status === 'pending' ? 'Iniciar' : 'Completar'}
          </Button>
        )}

        {/* To-Do: Implementar edicion de tareas */}
        {onEdit && <IconButton onClick={() => {}} aria-label="Modificar"></IconButton>}

        <DeleteButton $variant="danger" onClick={() => onDelete(task.id)} aria-label="Eliminar">
          <TrashIcon />
        </DeleteButton>
      </Actions>
    </Card>
  );
}
