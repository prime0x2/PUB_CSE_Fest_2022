import { Router } from "express";
import { verifyJWT } from "../middleware/verify_JWT.middleware.js";
import { StudentController } from "../controllers/student.controller.js";

const router = Router();


router.post('/login', StudentController.login);
router.post('/register', StudentController.register);
router.get('/profile', verifyJWT, StudentController.getMyProfile);
router.put('/profile', verifyJWT, StudentController.updateProfile);
router.put('/payment', verifyJWT, StudentController.payment);



export default router;