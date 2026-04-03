import express from 'express';
const router = express.Router();

import userRoutes from './userRoutes.js';
import recordRoutes from './recordRoutes.js';
import dashboardRoutes from './dashboardRoutes.js';
import authRoutes from './authRoutes.js';

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/records', recordRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;
