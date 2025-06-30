const express = require('express');
const router = express.Router();
const controller = require('../controllers/medicineController');

router.get('/', controller.getAllMedicines);
router.post('/', controller.addMedicine);

module.exports = router;
