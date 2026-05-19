import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: Number,
        required: [true, "Room Number Type is required"],
        unique: [true, "Room Number must be unique"]
    },
    roomType: {
        type: String,
        required: [true, "Room Type is required"],
        enum: {
            values: ["SINGLE", "DOUBLE", "DELUXE", "SUITE"],
            message: "Role can only contain ADMIN or CUSTOMER"
        }
    },
    capacity: {
        type: Number,
        required: [true, "Capacity is required"]
    },
    pricePerNight: {
        type: Number,
        required: [true, "Price is required"]
    },
    status: {
        type: String,
        required: [true, "Status is required"],
        enum: {
            values: ["AVAILABLE", "NOTAVAILABLE"],
            message: "Status can only contain AVAILABLE or NOTAVAILABLE"
        },
        default: "AVAILABLE"
    },
    floor: {
        type: Number,
    }
}, {
    timestamps: true
});

const roomModel = mongoose.model("ROOMS", roomSchema);
export default roomModel;