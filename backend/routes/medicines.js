import express from 'express';
const router = express.Router();
import * as controller from '../controller/medicineController.js';

router.get('/', controller.getAllMedicines);
router.post('/', controller.addMedicine);

export default router;