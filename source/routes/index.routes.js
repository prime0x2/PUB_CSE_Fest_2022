import { Router } from "express";
import studentRoutes from './student.routes.js';

const router = Router();


/*--------------------- api test route ---------------------*/

router.get("/", (req, res) => {
    res.send(`<h1>Hello Nigga...API running...! 🐸</h1>`);
});


/*---------------------- other routes ----------------------*/

router.use("/student", studentRoutes);



export default router;