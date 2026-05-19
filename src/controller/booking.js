import bookingModel from "../models/booking.js";
import roomModel from "../models/rooms.js";

export const availableRoomsForCustomers = async (req, res) => {

    const { userID } = req.user;

    const { CheckInDate, CheckOutDate, guestCount } = req.body;

    const requestedCheckInDate = new Date(CheckInDate);
    const requestedCheckOutDate = new Date(CheckOutDate);
    const guests = Number(guestCount);

    if (
        !CheckInDate ||
        !CheckOutDate ||
        !guestCount ||
        isNaN(requestedCheckInDate.getTime()) ||
        isNaN(requestedCheckOutDate.getTime()) ||
        requestedCheckInDate >= requestedCheckOutDate
    ) {
        return res.status(400).json({
            message: "Invalid input data",
        });
    }

    let rooms = await roomModel.find({
        status: "AVAILABLE",
    });

    const bookings = await bookingModel.find({
        status: "CONFIRMED",
    });

    const overlapBookings = bookings.filter((booking) => {
        return (
            requestedCheckInDate < booking.checkOutDate &&
            requestedCheckOutDate > booking.checkInDate
        );
    });

    const notavailableRooms = overlapBookings.map((booking) =>
        booking.roomID.toString()
    );

    rooms = rooms.filter((room) => {
        return !notavailableRooms.includes(room._id.toString());
    });

    rooms = rooms.filter((room) => room.capacity >= guests);

    return res.status(200).json({
        message: "Available rooms found successfully",
        rooms,
    });
}

export const bookRoom = async (req, res) => {

    const { userID } = req.user;
    const roomID = req.params.roomId;
    const { CheckInDate, CheckOutDate, guestCount } = req.body;

    const requestedCheckInDate = new Date(CheckInDate);
    const requestedCheckOutDate = new Date(CheckOutDate);
    const guests = Number(guestCount);

    if (
        isNaN(requestedCheckInDate.getTime()) ||
        isNaN(requestedCheckOutDate.getTime()) ||
        requestedCheckInDate >= requestedCheckOutDate
    ) {
        return res.status(400).json({
            message: "Invalid dates"
        });
    }

    const room = await roomModel.findById(roomID);

    if (!room) {
        return res.status(404).json({
            message: "Room not found"
        });
    }

    if (room.status !== "AVAILABLE") {
        return res.status(400).json({
            message: "Room is not available"
        });
    }

    if (guests > room.capacity) {
        return res.status(400).json({
            message: "Guest count exceeds room capacity"
        });
    }

    const existingBookings = await bookingModel.find({
        roomID,
        status: "CONFIRMED"
    });

    const overlapBookings = existingBookings.filter((booking) => {
        return (
            requestedCheckInDate < booking.checkOutDate &&
            requestedCheckOutDate > booking.checkInDate
        );
    });

    if (overlapBookings.length > 0) {
        return res.status(400).json({
            message: "Room not available for selected dates"
        });
    }

    const booking = await bookingModel.create({
        userID,
        roomID,
        checkInDate: requestedCheckInDate,
        checkOutDate: requestedCheckOutDate,
        guestCount: guests,
        status: "PENDING"
    });

    return res.status(201).json({
        message: "Booking created successfully",
        booking
    });
}

export const getPendingBookings = async (req, res) => {

    const { userID, role } = req.user;

    if (role !== "ADMIN") {
        return res.status(401).json({
            message: "Unauthorize person can't get Pending Bookings!!!"
        });
    }

    const bookings = await bookingModel.find({
        status: "PENDING",
    });

    if (!bookings) {
        return res.status(401).json({
            message: "Their is no pending Bookings"
        })
    }

    return res.status(200).json({
        message: "pending Bookings fetched Successfully",
        bookings
    })
}

export const approveBooking = async (req, res) => {

    const { userID, role } = req.user;
    const bookingId = req.params.bookingId;

    if (role !== "ADMIN") {
        return res.status(401).json({
            message: "Unauthorize person can't get Approve Bookings!!!"
        });
    }

    const booking = await bookingModel.findById(bookingId);
    console.log(booking);
    

    if (!booking) {
        return res.status(401).json({
            message: "Their is no pending Bookings"
        })
    }

    booking.status = "CONFIRMED";
    booking.save();

    return res.status(200).json({
        message: "pending Booking Approve Successfully",
        booking
    })
}

export const rejectBooking = async (req, res) => {

    const { userID, role } = req.user;
    const bookingId = req.params.bookingId;

    if (role !== "ADMIN") {
        return res.status(401).json({
            message: "Unauthorize person can't get Reject Bookings!!!"
        });
    }

    const booking = await bookingModel.findById(bookingId);
    console.log(booking);
    

    if (!booking) {
        return res.status(401).json({
            message: "Their is no pending Bookings"
        })
    }

    booking.status = "CANCELLED";
    booking.save();

    return res.status(200).json({
        message: "pending Booking Reject Successfully",
        booking
    })
}

export const checkInGuest = async (req, res) => {

    const { userID, role } = req.user;
    const bookingId = req.params.bookingId;

    if (role !== "ADMIN") {
        return res.status(401).json({
            message: "Unauthorize person can't get check In Guest Bookings!!!"
        });
    }

    const booking = await bookingModel.findById(bookingId);
    console.log(booking);
    

    if (!booking) {
        return res.status(401).json({
            message: "Their is no pending Bookings"
        })
    }

    booking.status = "CHECKED_IN";
    booking.save();

    return res.status(200).json({
        message: "CHECKED_IN Guest Successfully",
        booking
    })
}

export const checkOutGuest = async (req, res) => {

    const { userID, role } = req.user;
    const bookingId = req.params.bookingId;

    if (role !== "ADMIN") {
        return res.status(401).json({
            message: "Unauthorize person can't get check Out Guest Bookings!!!"
        });
    }

    const booking = await bookingModel.findById(bookingId);
    console.log(booking);
    

    if (!booking) {
        return res.status(401).json({
            message: "Their is no pending Bookings"
        })
    }

    booking.status = "COMPLETED";
    booking.save();

    return res.status(200).json({
        message: "CHECKED_OUT Guest Successfully",
        booking
    })
}

export const todayCheckins = async (req, res) => {
    const { role } = req.user;

    if (role !== "ADMIN") {
        return res.status(403).json({
            message: "Only admin can access this resource."
        });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const bookings = await bookingModel.find({
        status: "CONFIRMED",
        checkInDate: {
            $gte: today,
            $lt: tomorrow
        }
    })
    .populate("userId", "name email phone")
    .populate("roomID", "roomNumber roomType");

    if (bookings.length === 0) {
        return res.status(200).json({
            message: "No check-ins scheduled for today.",
            bookings: []
        });
    }

    return res.status(200).json({
        message: "Today's check-ins fetched successfully.",
        bookings
    });
};

export const todayCheckouts = async (req, res) => {
    const { role } = req.user;

    if (role !== "ADMIN") {
        return res.status(403).json({
            message: "Only admin can access this resource."
        });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const bookings = await bookingModel.find({
        status: "CHECKED_IN",
        checkOutDate: {
            $gte: today,
            $lt: tomorrow
        }
    })
    .populate("userId", "name email phone")
    .populate("roomID", "roomNumber roomType");

    if (bookings.length === 0) {
        return res.status(200).json({
            message: "No check-outs scheduled for today.",
            bookings: []
        });
    }

    return res.status(200).json({
        message: "Today's check-outs fetched successfully.",
        bookings
    });
};