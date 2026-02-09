import db from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

export const UserModel = {
  findAll() {
    return db.prepare('SELECT * FROM users ORDER BY created_at DESC').all();
  },

  findById(id) {
    return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  },

  findByEmail(email) {
    return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  },

  create({ name, email, role = 'user' }) {
    const id = uuidv4();
    db.prepare('INSERT INTO users (id, name, email, role) VALUES (?, ?, ?, ?)').run(id, name, email, role);
    return this.findById(id);
  },

  update(id, { name, email, role }) {
    const user = this.findById(id);
    if (!user) return null;

    db.prepare('UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?').run(
      name ?? user.name,
      email ?? user.email,
      role ?? user.role,
      id
    );
    return this.findById(id);
  },

  delete(id) {
    const user = this.findById(id);
    if (!user) return false;
    db.prepare('DELETE FROM users WHERE id = ?').run(id);
    return true;
  }
};
