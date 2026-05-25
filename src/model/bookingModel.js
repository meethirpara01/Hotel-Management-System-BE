import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USERS",
        required: [true, "UserId is required"],
    },
    roomID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ROOMS",
        required: [true, "UserId is required"],
    },
    checkInDate: {
        type: Date,
        required: [true, "Check in date id required"]
    },
    checkOutDate: {
        type: Date,
        required: [true, "Check Out date id required"]
    },
    guestCount: {
        type: String,
        required: [true, "Number of guest required"]
    },
    status: {
        type: String,
        required: [true, "Status is required"],
        enum: {
            values: ["PENDING", "CONFIRMED", "CHECKED_IN", "COMPLETED", "CANCELLED"],
            message: "Status can only contain PENDING or CONFIRMED or CHECKED_IN or COMPLETED or CANCELLED"
        },
        default: "PENDING"
    }
}, {
    timestamps: true
});

const bookingModel = new mongoose.model("BOOKINGS", bookingSchema);
export default bookingModel;