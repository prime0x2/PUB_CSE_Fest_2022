import cors from 'cors';
import express from 'express';
import * as http from 'http';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import apiRoutes from './source/routes/index.routes.js';
import { errorLogger } from './source/middleware/error_logger.middleware.js';

dotenv.config();

const PORT = process.env.SERVER_PORT || 5000;

const app = express();


/*----------------- middleware -----------------*/

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/*----------------- routes -----------------*/

app.use('/api', apiRoutes);


/*----------------- error handling -----------------*/

app.use(errorLogger);


/*----------------- server -----------------*/

// const httpServer = http.createServer(app);


/*---------------- database ----------------*/

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${process.env.SERVER_PORT}/api/`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
