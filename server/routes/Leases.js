import express from 'express';

import { getLeaseById, getLeaseByEmail, getLeases } from '../controllers/Leases.js';

const router = express.Router();

router.get('/', getLeases);
router.get('id/:id', getLeaseById);
router.get('/email/:email', getLeaseByEmail);






export default router;