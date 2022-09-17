import { Router } from "express";
import { verifyJWT } from "../middleware/verify_JWT.middleware.js";
import { StudentController } from "../controllers/student.controller.js";

const router = Router();


router.post('/login', StudentController.login);
router.post('/register', StudentController.register);
router.get('/details', verifyJWT, StudentController.getDetails);
router.put('/details', verifyJWT, StudentController.updateDetails);



export default router;