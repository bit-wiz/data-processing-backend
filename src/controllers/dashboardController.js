import * as dashboardService from '../services/dashboardService.js';

export const getSummary = async (req, res, next) => {
    try {
        const summary = await dashboardService.getSummary();
        res.json({ success: true, data: summary });
    } catch (error) {
        next(error);
    }
};

export const getCategoryWise = async (req, res, next) => {
    try {
        const categories = await dashboardService.getCategoryWise();
        res.json({ success: true, data: categories });
    } catch (error) {
        next(error);
    }
};

export const getMonthlyTrends = async (req, res, next) => {
    try {
        const trends = await dashboardService.getMonthlyTrends();
        res.json({ success: true, data: trends });
    } catch (error) {
        next(error);
    }
};

export const getRecent = async (req, res, next) => {
    try {
        const recent = await dashboardService.getRecent();
        res.json({ success: true, data: recent });
    } catch (error) {
        next(error);
    }
};
