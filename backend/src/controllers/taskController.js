import { TaskModel } from '../models/taskModel.js';

export const taskController = {
  // TODO: Implementar getAll - debe aceptar query params: status, priority, user_id

  getById(req, res) {
    const task = TaskModel.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json(task);
  },

  create(req, res) {
    const { title, description, status, priority, user_id } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'El título es requerido' });
    }

    const validStatuses = ['pending', 'in_progress', 'completed'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ error: `Estado inválido. Opciones: ${validStatuses.join(', ')}` });
    }

    const validPriorities = ['low', 'medium', 'high'];
    if (priority && !validPriorities.includes(priority)) {
      return res.status(400).json({ error: `Prioridad inválida. Opciones: ${validPriorities.join(', ')}` });
    }

    const task = TaskModel.create({ title, description, status, priority, user_id });
    res.status(201).json(task);
  },

  update(req, res) {
    const { title, description, status, priority, user_id } = req.body;

    const validStatuses = ['pending', 'in_progress', 'completed'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ error: `Estado inválido. Opciones: ${validStatuses.join(', ')}` });
    }

    const validPriorities = ['low', 'medium', 'high'];
    if (priority && !validPriorities.includes(priority)) {
      return res.status(400).json({ error: `Prioridad inválida. Opciones: ${validPriorities.join(', ')}` });
    }

    const task = TaskModel.update(req.params.id, { title, description, status, priority, user_id });
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.json(task);
  },

  delete(req, res) {
    const deleted = TaskModel.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.status(204).send();
  },

  getStats(req, res) {
    const stats = TaskModel.getStats();
    res.json(stats);
  }
};
