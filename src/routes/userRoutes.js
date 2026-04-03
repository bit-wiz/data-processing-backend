import express from 'express';
const router = express.Router();
import * as userController from '../controllers/userController.js';
import { userValidation } from '../utils/validation.js';
import { validate } from '../middleware/validateMiddleware.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/rbacMiddleware.js';

router.use(authenticate);
router.use(authorize(['admin']));

/**
 * @swagger
 * /users:
 *   get:
 *     summary: List all users
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/', userController.getUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email]
 *             properties:
 *               name: { type: string, example: "John Doe" }
 *               email: { type: string, example: "john@example.com" }
 *               role: { type: string, enum: [viewer, analyst, admin], example: "analyst" }
 *     responses:
 *       201:
 *         description: User created
 */
router.post('/', userValidation.create, validate, userController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update user role or status
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer, example: 2 }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role: { type: string, enum: [viewer, analyst, admin], example: "admin" }
 *               status: { type: string, enum: [active, inactive], example: "active" }
 *     responses:
 *       200:
 *         description: User updated
 */
router.patch('/:id', userValidation.update, validate, userController.updateUser);

export default router;
