import { Router } from "express";
import identifyUser from "../middlewares/auth.js";
import { addRooms, deleteRooms, updateRoomStatus } from "../controller/room.js";
import { addRoomValidator } from "../validation/room.validator.js";

const roomRouter = Router();

roomRouter.post('/addRoom', identifyUser, addRoomValidator, addRooms);

roomRouter.get('/updateRoomStatus/:roomId', identifyUser, updateRoomStatus);

roomRouter.get('/deleteRoom/:roomId', identifyUser, deleteRooms);

export default roomRouter;