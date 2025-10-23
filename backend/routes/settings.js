// Settings routes
import express from 'express';
import { requireAdmin } from './admin.js';
import {
  getSettings,
  getTheme,
  getFeatures,
  updateSettings
} from '../controllers/admin/settingsController.js';

const router = express.Router();

// Public routes (no authentication required)
router.get('/theme', getTheme);
router.get('/features', getFeatures);

// Admin routes (authentication required)
router.get('/', requireAdmin, getSettings);
router.put('/', requireAdmin, updateSettings);

export default router;
