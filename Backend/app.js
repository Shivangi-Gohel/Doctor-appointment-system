import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from "cookie-parser"

const app = express();

import dotenv from 'dotenv';
dotenv.config();


app.use(cors({
    origin: "https://doctor-appointment-system-lake.vercel.app/", // Your frontend's origin
    credentials: true
}))


app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

import router from './routes/user.routes.js';
import adminRouter from './routes/admin.routes.js';
import doctorRouter from './routes/doctor.routes.js';

try {
    app.use('/api/v1/users', router);
    app.use('/api/v1/admin', adminRouter);
    app.use('/api/v1/doctors', doctorRouter);
} catch (error) {
    console.log("Error while setting up routes: ", error);  
}

export { app };