import { Router } from 'express';
import { taskController } from '../controllers/taskController.js';

const router = Router();

router.get('/stats', taskController.getStats);
// TODO: Crear endpoint GET / para listar tareas
router.get('/:id', taskController.getById);
router.post('/', taskController.create);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.delete);

export default router;
