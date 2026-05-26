import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectToDB from './src/database/connection.js';
import path from "path";

import authRoute from './src/routes/authRoutes.js';
import roomRouter from './src/routes/roomRoutes.js';
import bookingRouter from './src/routes/bookingRoutes.js';

const app = express();

connectToDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

app.use(
    "/ROOM_IMAGES",
    express.static(
        path.join(
            process.cwd(),
            "src",
            "assets",
            "ROOM_IMAGES"
        )
    )
);

app.use(
   "/PROFILE_PIC_IMAGES",
   express.static(
      path.join(
         process.cwd(),
         "src",
         "assets",
         "PROFILE_PIC_IMAGES"
      )
   )
);

app.use("/api/auth/", authRoute);

app.use("/api/room/", roomRouter);

app.use("/api/room/", bookingRouter);


app.listen(3000, () => {
    console.log("Server is running on port 3000");
})