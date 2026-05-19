# 🏨 Hotel Management System API List (MERN Stack)

This document contains the complete API list for your Hotel Management System project.

---

# 📌 Base URL

```http
http://localhost:3000/api
```

---

# 🔐 1. Authentication APIs

## Register User
```http
POST /api/auth/register
```

### Request Body
```json
{
  "name": "Meet Hirpara",
  "email": "meet@gmail.com",
  "password": "12345678",
  "phone": "9876543210",
  "role": "CUSTOMER"
}
```

---

## Login User
```http
POST /api/auth/login
```

### Request Body
```json
{
  "email": "meet@gmail.com",
  "password": "12345678"
}
```

---

## Get Current User
```http
GET /api/auth/me
```

---

# 👤 2. Customer APIs

## Search Available Rooms
```http
POST /api/room/customer/availableRooms
```

### Request Body
```json
{
  "CheckInDate": "2026-05-22",
  "CheckOutDate": "2026-05-25",
  "guestCount": 2
}
```

---

## Book Selected Room
```http
POST /api/room/customer/book/:roomId
```

### Example
```http
POST /api/room/customer/book/6a0cd74349e1285a70de7b3a
```

### Request Body
```json
{
  "CheckInDate": "2026-05-22",
  "CheckOutDate": "2026-05-25",
  "guestCount": 2
}
```

---

## Get My Bookings
```http
GET /api/bookings/my
```

---

## Cancel My Booking
```http
PATCH /api/bookings/:bookingId/cancel
```

---

# 🏨 3. Room APIs (Admin)

## Create Room
```http
POST /api/rooms
```

### Request Body
```json
{
  "roomNumber": 101,
  "roomType": "DOUBLE",
  "capacity": 2,
  "pricePerNight": 1600,
  "status": "AVAILABLE",
  "floor": 1,
  "description": "Comfortable double room"
}
```

---

## Get All Rooms
```http
GET /api/rooms
```

---

## Get Single Room
```http
GET /api/rooms/:roomId
```

---

## Update Room
```http
PUT /api/rooms/:roomId
```

---

## Update Room Status
```http
PATCH /api/rooms/:roomId/status
```

### Request Body
```json
{
  "status": "NOTAVAILABLE"
}
```

---

# 📋 4. Booking Management APIs (Admin)

## Get All Pending Bookings
```http
GET /api/admin/bookings/pending
```

---

## Approve Booking
```http
PATCH /api/bookings/:bookingId/approve
```

### Status Change
```text
PENDING → CONFIRMED
```

---

## Reject Booking
```http
PATCH /api/bookings/:bookingId/reject
```

### Status Change
```text
PENDING → CANCELLED
```

---

## Check-In Guest
```http
PATCH /api/bookings/:bookingId/check-in
```

### Status Change
```text
CONFIRMED → CHECKED_IN
```

---

## Check-Out Guest
```http
PATCH /api/bookings/:bookingId/check-out
```

### Status Change
```text
CHECKED_IN → COMPLETED
```

---

# 📊 5. Dashboard APIs (Admin)

## Dashboard Summary
```http
GET /api/dashboard/summary
```

Returns:
- Total rooms
- Total users
- Total bookings
- Pending bookings
- Confirmed bookings
- Revenue

---

## Today's Check-Ins
```http
GET /api/dashboard/today-checkins
```

---

## Today's Check-Outs
```http
GET /api/dashboard/today-checkouts
```

---

## Pending Bookings Summary
```http
GET /api/dashboard/pending-bookings
```

---

# 👥 6. User Management APIs (Admin)

## Get All Users
```http
GET /api/users
```

---

## Get Single User
```http
GET /api/users/:userId
```

---

## Block/Unblock User
```http
PATCH /api/users/:userId/status
```

### Request Body
```json
{
  "isActive": false
}
```

---

# 🔄 Booking Lifecycle

```text
PENDING
   ↓
CONFIRMED
   ↓
CHECKED_IN
   ↓
COMPLETED

PENDING ─────→ CANCELLED
CONFIRMED ───→ CANCELLED
```

---

# 🧠 Room Availability Logic

A room is returned only when:

1. `room.status === "AVAILABLE"`
2. No overlapping `CONFIRMED` booking exists.
3. `room.capacity >= guestCount`

---

# 📌 Overlap Formula

```text
requestedCheckIn < existingCheckOut
AND
requestedCheckOut > existingCheckIn
```

---

# 📂 Suggested Route Grouping

## Auth
- `/api/auth/*`

## Customer Booking
- `/api/room/customer/*`

## Rooms
- `/api/rooms/*`

## Bookings
- `/api/bookings/*`

## Dashboard
- `/api/dashboard/*`

## Users
- `/api/users/*`

---

# 📈 Total APIs

| Module | Count |
|------|------:|
| Authentication | 3 |
| Customer | 4 |
| Rooms | 5 |
| Booking Workflow | 5 |
| Dashboard | 4 |
| Users | 3 |
| **Total** | **24 APIs** |

---

# 🏆 MVP Priority Order

### Phase 1 (Core)
- Register
- Login
- Create Room
- Search Available Rooms
- Book Room

### Phase 2 (Customer)
- My Bookings
- Cancel Booking

### Phase 3 (Admin Workflow)
- Pending Bookings
- Approve Booking
- Reject Booking
- Check-In
- Check-Out

### Phase 4 (Dashboard)
- Summary
- Today Check-Ins
- Today Check-Outs

---

# 🚀 Final Note

You have already completed the two most important APIs:

- ✅ Search Available Rooms
- ✅ Book Selected Room

These are the hardest parts of the entire project.

Once you finish the remaining workflow and dashboard APIs, this will be a very strong full-stack portfolio project.

