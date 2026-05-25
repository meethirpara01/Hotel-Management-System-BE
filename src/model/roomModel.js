import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: Number,
        required: true,
        unique: true,
    },

    roomType: {
        type: String,
        enum: {
            values: ["SINGLE", "DOUBLE", "DELUXE", "SUITE"],
            message: "Room Type only can be SINGLE, DOUBLE, DELUXE and SUITE"
        },
        required: true,
    },

    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
        default: "Spacious upgraded room with premium facilities and comfort."
    },

    bedType: {
        type: String,
        enum: ["SINGLE_BED", "DOUBLE_BED", "KING_BED"],
        required: true,
    },

    bedCount: {
        type: Number,
        default: 1,
    },

    category: {
        type: String,
        enum: ["BUDGET", "STANDARD", "PREMIUM", "LUXURY"],
        default: "STANDARD",
    },

    capacity: {
        type: Number,
        required: true,
    },

    pricePerNight: {
        type: Number,
        required: true,
    },

    floor: {
        type: Number,
    },

    status: {
        type: String,
        enum: ["AVAILABLE", "NOTAVAILABLE"],
        default: "AVAILABLE",
    },

    images: {
        type: [String],
        default: [],
    },
}, {
    timestamps: true,
});

const roomModel = mongoose.model("ROOMS", roomSchema);
export default roomModel;