import express from 'express';
import pharmacyController from '../controller/pharmacyController.js';
import VerifyToken from '../middleware/VerifyToken.js';
// import { authenticate, authorize } from '../middleware/authMiddleware.js';
// import multer from 'multer';
// const upload = multer({ dest: 'uploads/' }); 

import upload from "../config/multer.js";



const PharmacyRouter = express.Router();

// Apply authentication middleware to all routes
// router.use(authenticate);
// router.use(authorize('pharmacy'));

// Orders routes
PharmacyRouter.get('/orders', VerifyToken,pharmacyController.getPharmacyOrders);
PharmacyRouter.patch('/orders/:orderId/status', VerifyToken, pharmacyController.updateOrderStatus);


// Profile routes
PharmacyRouter.get('/profile', VerifyToken, pharmacyController.getPharmacyProfile);
// PharmacyRouter.put('/profile', VerifyToken, pharmacyController.updatePharmacyProfile);

PharmacyRouter.put(
  '/profile', 
  VerifyToken, 
  upload.single("profileImage"), // Make sure this is the same multer instance
  pharmacyController.updatePharmacyProfile
);


PharmacyRouter.patch('/change-password', VerifyToken, pharmacyController.changePassword);


PharmacyRouter.get('/medicines', VerifyToken,pharmacyController.getPharmacyMedicines);

// Medicines routes
PharmacyRouter.get('/medicines', VerifyToken,pharmacyController.getPharmacyMedicines);
PharmacyRouter.post('/medicines', VerifyToken,pharmacyController.createMedicine);
PharmacyRouter.put('/medicines/:medicineId',VerifyToken, pharmacyController.updateMedicine);
PharmacyRouter.delete('/medicines/:medicineId', VerifyToken,pharmacyController.removeMedicine);
// Reviews routes
PharmacyRouter.get('/reviews', VerifyToken, pharmacyController.getPharmacyReviews);
PharmacyRouter.delete('/reviews/:reviewId',VerifyToken,  pharmacyController.deletePharmacyReview);

// Categories routes
PharmacyRouter.get('/categories', VerifyToken, pharmacyController.getCategories);
PharmacyRouter.post('/categories', VerifyToken, pharmacyController.createCategory);
PharmacyRouter.get('/orders', VerifyToken, pharmacyController.getPharmacyOrders);

export default PharmacyRouter;