// Track routes
import express from 'express';
import { getAllTracks } from '../controllers/trackController.js'; // import controller functions as needed
const router = express.Router();

// Example route: GET all tracks
router.get('/', getAllTracks);

export default router;
