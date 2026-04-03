import * as recordService from '../services/recordService.js';

export const getRecords = async (req, res, next) => {
    try {
        const filters = req.query;
        const records = await recordService.getAllRecords(filters);
        res.json({ success: true, data: records });
    } catch (error) {
        next(error);
    }
};

export const getRecord = async (req, res, next) => {
    try {
        const { id } = req.params;
        const record = await recordService.getRecordById(id);
        if (!record) {
            return res.status(404).json({ success: false, message: 'Record not found' });
        }
        res.json({ success: true, data: record });
    } catch (error) {
        next(error);
    }
};

export const createRecord = async (req, res, next) => {
    try {
        const recordData = {
            ...req.body,
            userId: req.user.id,
        };
        const record = await recordService.createRecord(recordData);
        res.status(201).json({ success: true, data: record });
    } catch (error) {
        next(error);
    }
};

export const updateRecord = async (req, res, next) => {
    try {
        const { id } = req.params;
        const record = await recordService.updateRecord(id, req.body);
        res.json({ success: true, data: record });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ success: false, message: 'Record not found' });
        }
        next(error);
    }
};

export const deleteRecord = async (req, res, next) => {
    try {
        const { id } = req.params;
        await recordService.deleteRecord(id);
        res.json({ success: true, message: 'Record deleted successfully' });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ success: false, message: 'Record not found' });
        }
        next(error);
    }
};
