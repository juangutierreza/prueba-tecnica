import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Columns } from './Columns';
import { Button } from './Button';

const Form = styled.form`
  h2 {
    margin: 0 0 1rem;
    font-size: 1.1rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 0.75rem;

  label {
    display: block;
    font-size: 0.8rem;
    font-weight: 600;
    color: #4a5568;
    margin-bottom: 0.25rem;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 0.9rem;
    box-sizing: border-box;
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const defaultForm = { title: '', description: '', priority: 'medium' };

export function TaskForm({ task, onSubmit, onCancel }) {
  const isEditing = Boolean(task);
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
      });
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    onSubmit(form);
    if (!isEditing) setForm(defaultForm);
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Modificar tarea' : 'Nueva Tarea'}</h2>

      <Columns $template="1fr 0.6fr">
        <FormGroup>
          <label htmlFor="title">Título *</label>
          <input
            id="title"
            type="text"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Nombre de la tarea"
            required
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="priority">Prioridad</label>
          <select id="priority" value={form.priority} onChange={(e) => handleChange('priority', e.target.value)}>
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
        </FormGroup>
      </Columns>

      <FormGroup>
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Descripción opcional"
          rows={3}
        />
      </FormGroup>

      <FormActions>
        {onCancel && (
          <Button type="button" $variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" $variant="primary">
          {isEditing ? 'Modificar' : 'Crear Tarea'}
        </Button>
      </FormActions>
    </Form>
  );
}
