import { Router } from "express";
import { approveBooking, availableRoomsForCustomers, bookRoom, cancelBooking, checkInGuest, checkOutGuest, getPendingBookings, mybookings, rejectBooking, todayCheckins, todayCheckouts } from "../controllers/bookingController.js";
import identifyUser from "../middlewares/authMiddleware.js";

const bookingRouter = Router();

bookingRouter.post("/customer/availableRooms", identifyUser, availableRoomsForCustomers);

bookingRouter.post("/customer/book/:roomId", identifyUser, bookRoom);

bookingRouter.get("/customer/mybookings", identifyUser, mybookings);

bookingRouter.get("/customer/cancelBooking/:bookingId", identifyUser, cancelBooking);



bookingRouter.get("/admin/bookings/pending", identifyUser, getPendingBookings);

bookingRouter.get("/admin/bookings/approve/:bookingId", identifyUser, approveBooking);

bookingRouter.get("/admin/bookings/reject/:bookingId", identifyUser, rejectBooking);

bookingRouter.get("/admin/bookings/check-in/:bookingId", identifyUser, checkInGuest);

bookingRouter.get("/admin/cancelBooking/:bookingId", identifyUser, cancelBooking);

bookingRouter.get("/admin/bookings/check-out/:bookingId", identifyUser, checkOutGuest);

bookingRouter.get("/admin/bookings/dashboard/today-checkins", identifyUser, todayCheckins);

bookingRouter.get("/admin/bookings/dashboard/today-checkouts", identifyUser, todayCheckouts);

export default bookingRouter;


// https://drive.google.com/drive/folders/1Z0n5nVURkb9_rt5va2Yd8isx_tfXkapD?usp=sharing