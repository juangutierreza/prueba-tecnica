import db from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

export const TaskModel = {
  findAll({ status, priority, user_id } = {}) {
    let query = 'SELECT tasks.*, users.name as user_name FROM tasks LEFT JOIN users ON tasks.user_id = users.id';
    const conditions = [];
    const params = [];

    if (status) {
      conditions.push('tasks.status = ?');
      params.push(status);
    }
    if (priority) {
      conditions.push('tasks.priority = ?');
      params.push(priority);
    }
    if (user_id) {
      conditions.push('tasks.user_id = ?');
      params.push(user_id);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY tasks.created_at DESC';

    return db.prepare(query).all(...params);
  },

  findById(id) {
    return db.prepare(
      'SELECT tasks.*, users.name as user_name FROM tasks LEFT JOIN users ON tasks.user_id = users.id WHERE tasks.id = ?'
    ).get(id);
  },

  create({ title, description, status = 'pending', priority = 'medium', user_id }) {
    const id = uuidv4();
    db.prepare(
      'INSERT INTO tasks (id, title, description, status, priority, user_id) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(id, title, description || null, status, priority, user_id || null);
    return this.findById(id);
  },

  update(id, { title, description, status, priority, user_id }) {
    const task = this.findById(id);
    if (!task) return null;

    db.prepare(
      `UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, user_id = ?, updated_at = datetime('now') WHERE id = ?`
    ).run(
      title ?? task.title,
      description !== undefined ? description : task.description,
      status ?? task.status,
      priority ?? task.priority,
      user_id !== undefined ? user_id : task.user_id,
      id
    );
    return this.findById(id);
  },

  delete(id) {
    const task = this.findById(id);
    if (!task) return false;
    db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
    return true;
  },

  getStats() {
    return {
      total: db.prepare('SELECT COUNT(*) as count FROM tasks').get().count,
      byStatus: db.prepare('SELECT status, COUNT(*) as count FROM tasks GROUP BY status').all(),
      byPriority: db.prepare('SELECT priority, COUNT(*) as count FROM tasks GROUP BY priority').all(),
    };
  }
};
