import { useState } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { TaskCard } from '../../components/TaskCard';
import { TaskForm } from '../../components/TaskForm';
import { TaskFilters } from '../../components/TaskFilters';
import { TaskStats } from '../../components/TaskStats';
import { Modal } from '../../components/Modal';
import { Button } from '../../components/Button';
import { Toolbar, TaskList, LoadingMessage, EmptyMessage, ErrorMessage } from './partials';

export function Home() {
  const [filters, setFilters] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { tasks, loading, error, createTask, updateTask, deleteTask } = useTasks(filters);

  const handleCreate = async (data) => {
    try {
      await createTask(data);
      setShowForm(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleUpdate = async (data) => {
    try {
      await updateTask(editingTask.id, data);
      setEditingTask(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleStatusChange = async (id, data) => {
    if (data.status === 'completed') {
      if (!window.confirm('¿Marcar esta tarea como completada?')) return;
      try {
        await updateTask(id, data);
      } catch (err) {
        alert(err.message);
      }
      return;
    }
    try {
      await updateTask(id, data);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta tarea?')) return;
    try {
      await deleteTask(id);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <TaskStats />

      <Toolbar>
        <TaskFilters filters={filters} onChange={setFilters} />
        <Button $variant="primary" onClick={() => setShowForm(true)}>
          + Nueva Tarea
        </Button>
      </Toolbar>

      {showForm && (
        <Modal title="Nueva Tarea" onClose={() => setShowForm(false)}>
          <TaskForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
        </Modal>
      )}

      {editingTask && (
        <Modal title="Modificar Tarea" onClose={() => setEditingTask(null)}>
          <TaskForm task={editingTask} onSubmit={handleUpdate} onCancel={() => setEditingTask(null)} />
        </Modal>
      )}

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {loading ? (
        <LoadingMessage>Cargando tareas...</LoadingMessage>
      ) : tasks.length === 0 ? (
        <EmptyMessage>No hay tareas que mostrar</EmptyMessage>
      ) : (
        <TaskList>
          {tasks.map((task) => (
            <TaskCard task={task} onEdit={handleEdit} onStatusChange={handleStatusChange} onDelete={handleDelete} />
          ))}
        </TaskList>
      )}
    </>
  );
}
