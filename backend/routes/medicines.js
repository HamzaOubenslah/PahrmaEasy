import express from 'express';
const router = express.Router();
import * as controllers from '../controller/medicineController.js';
import VerifyToken from '../middleware/VerifyToken.js';

router.get('/', controllers.getAllMedicines);
router.post('/', controllers.addMedicine);
router.get('/all-medicines',controllers.fetchAllMedicines)

export default router;