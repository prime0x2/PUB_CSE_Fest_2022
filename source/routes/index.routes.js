import { Router } from "express";

const router = Router();


/*--------------------- api test route ---------------------*/

router.get("/", (req, res) => {
    res.send(`<h1>Hello Nigga...API running...! 🐸</h1>`);
});



export default router;