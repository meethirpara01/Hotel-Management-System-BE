import { Router } from "express";
import identifyUser from "../middlewares/authMiddleware.js";
import { addRooms, deleteRooms, updateRoomStatus } from "../controllers/roomController.js";
import { addRoomValidator } from "../validators/roomValidator.js";
import multer from 'multer';
import fs from 'fs'
import path from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = './src/assets/temp/';

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, {
                recursive: true
            });
        }

        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);

        cb(null, uniqueName + path.extname(file.originalname))
    }
});
const upload = multer({ storage: storage });

const roomRouter = Router();

roomRouter.post('/admin/addRoom', upload.array('ROOM_IMAGES'), identifyUser, addRoomValidator, addRooms);

roomRouter.patch('/admin/updateRoomStatus/:roomId', identifyUser, updateRoomStatus);

roomRouter.delete('/admin/deleteRoom/:roomId', identifyUser, deleteRooms);

export default roomRouter;