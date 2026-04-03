import express from 'express';
const router = express.Router();
import * as dashboardController from '../controllers/dashboardController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/rbacMiddleware.js';

router.use(authenticate);
router.use(authorize(['analyst', 'admin']));

/**
 * @swagger
 * /dashboard/summary:
 *   get:
 *     summary: Get financial summary
 *     tags: [Dashboard]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Summary data
 */
router.get('/summary', dashboardController.getSummary);

/**
 * @swagger
 * /dashboard/category-wise:
 *   get:
 *     summary: Get category-wise data
 *     tags: [Dashboard]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Category data
 */
router.get('/category-wise', dashboardController.getCategoryWise);

/**
 * @swagger
 * /dashboard/monthly-trends:
 *   get:
 *     summary: Get monthly trends
 *     tags: [Dashboard]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly trends
 */
router.get('/monthly-trends', dashboardController.getMonthlyTrends);

/**
 * @swagger
 * /dashboard/recent:
 *   get:
 *     summary: Get recent transactions
 *     tags: [Dashboard]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Recent data
 */
router.get('/recent', dashboardController.getRecent);

export default router;
