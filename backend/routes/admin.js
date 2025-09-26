// Admin routes: routes for adminController logic
import express from 'express';
import {
  getTables,
  getFields,
  getRecords,
  updateRecord,
  getTablesWithFieldsAndRecords,
  deleteRecord,
  insertRecord
} from '../controllers/admin/adminController.js';

const router = express.Router();

// GET all tables
router.get('/tables', getTables);

// GET fields for a table
router.get('/fields/:table', getFields);

// GET records for a table
router.get('/records/:table', getRecords);

// PUT update a record in a table by id
router.put('/records/:table/:id', updateRecord);

// DELETE a record in a table by id
router.delete('/records/:table/:id', deleteRecord);

// POST insert a new record into a table
router.post('/records/:table/', insertRecord);

// Route to get all tables with fields and records
router.get('/tables-with-fields-records', getTablesWithFieldsAndRecords);

export default router;
