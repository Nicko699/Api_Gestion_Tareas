import { Router } from "express";
import { TaskController } from "../../Controller/TaskController.js";
import { TaskServiceImpl } from "../../Service/TaskServiceImpl.js";
import { authenticate } from "../Middleware/AuthMiddware.js";
/**
 * Rutas para las tareas, protege las rutas con el middleware de autenticación JWT y delega la lógica a TaskController
 * @module TaskRoute -
 */
const router = Router();

const taskController = new TaskController(new TaskServiceImpl());

router.use(authenticate);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descripcion
 *               - fechaVencimiento
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Hacer informe
 *               descripcion:
 *                 type: string
 *                 example: Informe de ventas del mes
 *               fechaVencimiento:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-04-01T00:00:00.000Z
 *               estado:
 *                 type: string
 *                 enum: [PENDIENTE, EN_PROGRESO, COMPLETADA]
 *                 example: PENDIENTE
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */
router.post("/tasks", (req, res, next) =>
  taskController.createTask(req, res, next).catch(next)
);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Obtener todas las tareas del usuario autenticado
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tareas del usuario
 *       401:
 *         description: No autorizado
 */
router.get("/tasks", (req, res, next) =>
  taskController.getAllTasks(req, res, next).catch(next)
);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Obtener una tarea por id
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *       404:
 *         description: Tarea no encontrada
 *       401:
 *         description: No autorizado
 */
router.get("/tasks/:id", (req, res, next) =>
  taskController.getTaskById(req, res, next).catch(next)
);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Actualizar una tarea
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Informe actualizado
 *               descripcion:
 *                 type: string
 *                 example: Nueva descripcion
 *               fechaVencimiento:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-04-01T00:00:00.000Z
 *               estado:
 *                 type: string
 *                 enum: [PENDIENTE, EN_PROGRESO, COMPLETADA]
 *                 example: EN_PROGRESO
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente
 *       404:
 *         description: Tarea no encontrada
 *       401:
 *         description: No autorizado
 */
router.put("/tasks/:id", (req, res, next) =>
  taskController.updateTask(req, res, next).catch(next)
);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       204:
 *         description: Tarea eliminada exitosamente
 *       404:
 *         description: Tarea no encontrada
 *       401:
 *         description: No autorizado
 */
router.delete("/tasks/:id", (req, res, next) =>
  taskController.deleteTask(req, res, next).catch(next)
);

export default router;