import { Router } from "express";
import { approveBooking, availableRoomsForCustomers, bookRoom, checkInGuest, checkOutGuest, getPendingBookings, rejectBooking, todayCheckins, todayCheckouts } from "../controller/booking.js";
import identifyUser from "../middlewares/auth.js";

const bookingRouter = Router();

bookingRouter.post("/customer/availableRooms", identifyUser, availableRoomsForCustomers);

bookingRouter.post("/customer/book/:roomId", identifyUser, bookRoom);


bookingRouter.get("/admin/bookings/pending", identifyUser, getPendingBookings);

bookingRouter.get("/admin/bookings/approve/:bookingId", identifyUser, approveBooking);

bookingRouter.get("/admin/bookings/reject/:bookingId", identifyUser, rejectBooking);

bookingRouter.get("/admin/bookings/check-in/:bookingId", identifyUser, checkInGuest);

bookingRouter.get("/admin/bookings/check-out/:bookingId", identifyUser, checkOutGuest);

bookingRouter.get("/admin/bookings/dashboard/today-checkins", identifyUser, todayCheckins);

bookingRouter.get("/admin/bookings/dashboard/today-checkouts", identifyUser, todayCheckouts);

export default bookingRouter;