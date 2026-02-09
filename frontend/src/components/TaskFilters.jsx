import styled from 'styled-components';

const FiltersWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.85rem;
  background: white;
`;

export function TaskFilters({ filters, onChange }) {
  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <FiltersWrapper>
      <Select value={filters.status || ''} onChange={(e) => handleChange('status', e.target.value)}>
        <option value="">Todos los estados</option>
        <option value="pending">Pendiente</option>
        <option value="in_progress">En progreso</option>
        <option value="completed">Completada</option>
      </Select>
    </FiltersWrapper>
  );
}
