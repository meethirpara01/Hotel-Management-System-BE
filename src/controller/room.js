import roomModel from "../models/rooms.js";
import userModel from "../models/users.js";

export const addRooms = async (req, res) => {

    const { userID } = req.user;

    const user = await userModel.findById(userID);

    if (user.role !== "ADMIN") {
        return res.status(401).json({
            message: "Unathorized person can not add rooms!!!"
        })
    }

    const { roomNumber, roomType, capacity, pricePerNight, status, floor } = req.body;

    const isRoomAlreayExist = await roomModel.findOne({ roomNumber });

    if (isRoomAlreayExist) {
        return res.status(401).json({
            message: "Room already exist with this room number"
        });
    }

    const room = await roomModel.create({
        roomNumber,
        roomType,
        capacity,
        pricePerNight,
        status,
        floor
    });

    return res.status(201).json({
        message: "Room Added Successfully",
        room
    });
}

export const updateRoomStatus = async (req, res) => {

    const user = req.user;

    if (user.role !== "ADMIN") {
        return res.status(401).json({
            message: "Unathorized Person can not Update room status!!!"
        });
    }

    const roomId = req.params.roomId;

    const room = await roomModel.findById(roomId);

    if (!room) {
        return res.status(401).json({
            message: "Room Not Found"
        });
    }
    else {

        if (room.status === "AVAILABLE")
            room.status = "NOTAVAILABLE";
        else
            room.status = "AVAILABLE";
        room.save();

        return res.status(201).json({
            message: "Room Details Update successfully"
        });
    }
}

export const deleteRooms = async (req, res) => {

    const user = req.user;

    if (user.role !== "ADMIN") {
        return res.status(401).json({
            message: "Unathorized Person can not delete rooms!!!"
        });
    }

    const roomId = req.params.roomId;

    const room = await roomModel.findByIdAndDelete(roomId);

    if (!room) {
        return res.status(401).json({
            message: "Room Not Found"
        });
    }
    else {
        return res.status(201).json({
            message: "Room deleted successfully"
        });
    }
}