import { UserModel } from '../models/userModel.js';

export const userController = {
  getAll(req, res) {
    const users = UserModel.findAll();
    res.json(users);
  },

  getById(req, res) {
    const user = UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  },

  create(req, res) {
    const { name, email, role } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Nombre y email son requeridos' });
    }

    const existing = UserModel.findByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'Ya existe un usuario con ese email' });
    }

    const user = UserModel.create({ name, email, role });
    res.status(201).json(user);
  },

  update(req, res) {
    const { name, email, role } = req.body;
    const user = UserModel.update(req.params.id, { name, email, role });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(user);
  },

  delete(req, res) {
    const deleted = UserModel.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(204).send();
  }
};
