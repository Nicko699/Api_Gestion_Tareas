import { Router } from "express";
import { UserController } from "../../Controller/UserController.js";
import { UserServiceImpl } from "../../Service/UserServiceImpl.js";

/**
 * Rutas para los usuarios, delega la lógica a UserController  
 * @module UserRoute
 */
const router = Router();

const userController = new UserController(new UserServiceImpl());

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - email
 *               - password
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Juan Pérez
 *               email:
 *                 type: string
 *                 example: juan@email.com
 *               password:
 *                 type: string
 *                 example: secreto123
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/users", (req, res, next) =>
  userController.createUser(req, res, next).catch(next)
);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: juan@email.com
 *               password:
 *                 type: string
 *                 example: secreto123
 *     responses:
 *       200:
 *         description: Login exitoso, retorna token JWT
 *       401:
 *         description: Credenciales inválidas
 */
router.post("/users/login", (req, res, next) =>
  userController.login(req, res, next).catch(next)
);

export default router;