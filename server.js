import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import connectToDB from './src/database/database.js';

const app = express();

connectToDB();

app.use(express.json());
app.use(cookieParser());

import authRoute from './src/routes/auth.js';
app.use("/api/auth/", authRoute);

import roomRouter from './src/routes/room.js';
app.use("/api/room/", roomRouter);

import bookingRouter from './src/routes/booking.js';
app.use("/api/room/", bookingRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})