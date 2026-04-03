import { body, param, query } from 'express-validator';

export const userValidation = {
    create: [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('role').optional().isIn(['viewer', 'analyst', 'admin']).withMessage('Invalid role'),
        body('status').optional().isIn(['active', 'inactive']).withMessage('Invalid status'),
    ],
    update: [
        param('id').isInt().withMessage('Invalid ID format'),
        body('role').optional().isIn(['viewer', 'analyst', 'admin']).withMessage('Invalid role'),
        body('status').optional().isIn(['active', 'inactive']).withMessage('Invalid status'),
    ]
};

export const recordValidation = {
    create: [
        body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be a positive number'),
        body('type').isIn(['income', 'expense']).withMessage('Type must be income or expense'),
        body('category').notEmpty().withMessage('Category is required'),
        body('date').isISO8601().withMessage('Valid date is required (ISO8601)'),
        body('notes').optional().isString(),
    ],
    update: [
        param('id').isInt().withMessage('Invalid ID format'),
        body('amount').optional().isFloat({ min: 0.01 }).withMessage('Amount must be a positive number'),
        body('type').optional().isIn(['income', 'expense']).withMessage('Type must be income or expense'),
        body('category').optional().notEmpty().withMessage('Category is required'),
        body('date').optional().isISO8601().withMessage('Valid date is required (ISO8601)'),
        body('notes').optional().isString(),
    ],
    filter: [
        query('type').optional().isIn(['income', 'expense']).withMessage('Invalid type'),
        query('category').optional().isString().withMessage('Invalid category'),
        query('startDate').optional().isISO8601().withMessage('Invalid startDate'),
        query('endDate').optional().isISO8601().withMessage('Invalid endDate'),
    ]
};
