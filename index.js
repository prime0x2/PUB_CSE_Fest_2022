import cors from 'cors';
import express from 'express';
import * as http from 'http';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import apiRoutes from './source/routes/index.routes.js';
import { errorLogger } from './source/middleware/error_logger.middleware.js';

dotenv.config();

const app = express();


/*----------------- middleware -----------------*/

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorLogger);


/*----------------- routes -----------------*/

app.use('/api', apiRoutes);


/*----------------- server -----------------*/

const httpServer = http.createServer(app);


/*---------------- database ----------------*/

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        httpServer.listen(process.env.SERVER_PORT, () => {
            console.log(`Server running on http://localhost:${process.env.SERVER_PORT}/api/`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
