import { Router } from "express";
import { verifyJWT } from "../middleware/verify_JWT.middleware.js";
import { AdminController } from "../controllers/admin.controller.js";

const router = Router();


router.post('/login', AdminController.login);
router.post('/register', AdminController.register);
router.get('/admins', verifyJWT, AdminController.getAllAdmins);
router.get('/students', verifyJWT, AdminController.getStudentsList);
router.get('/student/:id', verifyJWT, AdminController.getStudentDetails);
router.delete('/student/:id', verifyJWT, AdminController.deleteStudent);
router.put('/payment/approve/:id', verifyJWT, AdminController.approvePayment);
router.put('/payment/reject/:id', verifyJWT, AdminController.rejectPayment);
router.put('/status/attending/:id', verifyJWT, AdminController.attendingStatus);
router.put('/status/tShirt/:id', verifyJWT, AdminController.tShirtStatus);
router.put('/status/food/:id', verifyJWT, AdminController.foodStatus);



export default router;