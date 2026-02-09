import db from './config/database.js';
import { v4 as uuidv4 } from 'uuid';

// Clear existing data
db.exec('DELETE FROM tasks');
db.exec('DELETE FROM users');

// Seed users
const users = [
  { id: uuidv4(), name: 'Ana García', email: 'ana@example.com', role: 'admin' },
  { id: uuidv4(), name: 'Carlos López', email: 'carlos@example.com', role: 'user' },
  { id: uuidv4(), name: 'María Rodríguez', email: 'maria@example.com', role: 'user' },
];

const insertUser = db.prepare('INSERT INTO users (id, name, email, role) VALUES (?, ?, ?, ?)');
for (const user of users) {
  insertUser.run(user.id, user.name, user.email, user.role);
}

// Seed tasks
const tasks = [
  { title: 'Configurar CI/CD pipeline', description: 'Configurar GitHub Actions para el proyecto', status: 'completed', priority: 'high', user_id: users[0].id },
  { title: 'Diseñar esquema de base de datos', description: 'Crear el modelo ER para la aplicación', status: 'completed', priority: 'high', user_id: users[0].id },
  { title: 'Implementar autenticación JWT', description: 'Agregar login y registro con tokens JWT', status: 'in_progress', priority: 'high', user_id: users[1].id },
  { title: 'Crear componentes de UI', description: 'Desarrollar los componentes base del design system', status: 'in_progress', priority: 'medium', user_id: users[2].id },
  { title: 'Escribir tests unitarios', description: 'Agregar tests para los modelos y controladores', status: 'pending', priority: 'medium', user_id: users[1].id },
  { title: 'Optimizar consultas SQL', description: 'Revisar y optimizar las queries más lentas', status: 'pending', priority: 'low', user_id: users[0].id },
  { title: 'Documentar API con Swagger', description: 'Crear la documentación OpenAPI', status: 'pending', priority: 'medium', user_id: users[2].id },
  { title: 'Implementar paginación', description: 'Agregar paginación a los endpoints de listado', status: 'pending', priority: 'low', user_id: users[1].id },
];

const insertTask = db.prepare('INSERT INTO tasks (id, title, description, status, priority, user_id) VALUES (?, ?, ?, ?, ?, ?)');
for (const task of tasks) {
  insertTask.run(uuidv4(), task.title, task.description, task.status, task.priority, task.user_id);
}

console.log(`Seed completado: ${users.length} usuarios y ${tasks.length} tareas creadas.`);
