import express from 'express';
const router = express.Router();
import * as authController from '../controllers/authController.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validateMiddleware.js';

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, example: "admin@example.com" }
 *               password: { type: string, example: "admin123" }
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
], validate, authController.login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: User Logout
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post('/logout', authController.logout);

export default router;
