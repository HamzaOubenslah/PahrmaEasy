import express from 'express';
import pharmacyController from '../controller/pharmacyController.js';
import VerifyToken from '../middleware/VerifyToken.js';


const PharmacyRouter = express.Router();


// Medicines routes
PharmacyRouter.get('/medicines', VerifyToken,pharmacyController.getPharmacyMedicines);
PharmacyRouter.post('/medicines', VerifyToken,pharmacyController.createMedicine);
PharmacyRouter.put('/medicines/:medicineId',VerifyToken, pharmacyController.updateMedicine);
PharmacyRouter.delete('/medicines/:medicineId', VerifyToken,pharmacyController.removeMedicine);
// Reviews routes
PharmacyRouter.get('/reviews', VerifyToken, pharmacyController.getPharmacyReviews);
PharmacyRouter.delete('/reviews/:reviewId',VerifyToken,  pharmacyController.deletePharmacyReview);

export default PharmacyRouter;