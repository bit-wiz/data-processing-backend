import express from 'express';
const router = express.Router();
import * as recordController from '../controllers/recordController.js';
import { recordValidation } from '../utils/validation.js';
import { validate } from '../middleware/validateMiddleware.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/rbacMiddleware.js';

router.use(authenticate);

/**
 * @swagger
 * /records:
 *   get:
 *     summary: List financial records
 *     tags: [Records]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema: { type: string, enum: [income, expense] }
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *       - in: query
 *         name: startDate
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: endDate
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: date
 *         schema: { type: string, format: date, example: "2024-03-01" }
 *     responses:
 *       200:
 *         description: List of records
 */
router.get('/', recordValidation.filter, validate, recordController.getRecords);

/**
 * @swagger
 * /records/{id}:
 *   get:
 *     summary: Get a single record
 *     tags: [Records]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer, example: 1 }
 *     responses:
 *       200:
 *         description: Record details
 */
router.get('/:id', recordController.getRecord);

/**
 * @swagger
 * /records:
 *   post:
 *     summary: Create a financial record
 *     tags: [Records]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount, type, category, date]
 *             properties:
 *               amount: { type: number, example: 120.50 }
 *               type: { type: string, enum: [income, expense], example: "expense" }
 *               category: { type: string, example: "Dining" }
 *               date: { type: string, format: date-time, example: "2024-03-25T10:00:00Z" }
 *               notes: { type: string, example: "Dinner with client" }
 *     responses:
 *       201:
 *         description: Record created
 */
router.post('/', authorize(['admin']), recordValidation.create, validate, recordController.createRecord);

/**
 * @swagger
 * /records/{id}:
 *   put:
 *     summary: Update a financial record
 *     tags: [Records]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer, example: 1 }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount: { type: number, example: 150.00 }
 *               category: { type: string, example: "Business Dining" }
 *     responses:
 *       200:
 *         description: Record updated
 */
router.put('/:id', authorize(['admin']), recordValidation.update, validate, recordController.updateRecord);

/**
 * @swagger
 * /records/{id}:
 *   delete:
 *     summary: Delete a financial record
 *     tags: [Records]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer, example: 1 }
 *     responses:
 *       200:
 *         description: Record deleted
 */
router.delete('/:id', authorize(['admin']), recordController.deleteRecord);

export default router;
