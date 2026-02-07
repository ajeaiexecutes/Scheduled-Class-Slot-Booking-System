
````md
#  Calendar-Based Slot Booking Backend

This project is a **RESTful backend service** for a calendar-based class slot booking system.  
It is built using **Node.js, Express, MongoDB, and JWT authentication**, and supports secure, flexible slot booking across multiple batches every month.

---

##  Tech Stack

- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT (JSON Web Token)  
- bcrypt (password hashing)

---

##  Core Features

- User registration and login
- JWT-based authentication
- Protected APIs using middleware
- Dynamic calendar generation
- Batch-based scheduling logic
- Slot booking with duplicate prevention
- Ability to add or delete slots even after submission
- User-scoped data access

---

##  Scheduling & Business Rules

### Monthly Batch Logic

- Each month has **3 batches**
- Each batch consists of **7 active class days**
- **Sundays are excluded**
- There is a **2 working-day gap** between batches (excluding Sundays)
- If the 1st of the month is Sunday, the batch starts on Monday
- Batch dates may spill over into the next month if required

### Topics

- Each active day has **7 topics**
- Users may book the **same topic across different batches**

---

##  User Booking Rules

- Slot booking is **incremental**, not final
- Users can:
  - Submit slots
  - Add more slots later
  - Delete previously booked slots
- Duplicate bookings for the same user are prevented at the database level
- Slot ownership is strictly enforced

---

##  Design Decisions

- Calendar data is **generated dynamically** and not stored in the database
- Each booked slot is stored as an **independent document**
- Backend is the **single source of truth** for scheduling rules
- No artificial limits are placed on how many times a user can submit slots

---

##  Authentication Flow

1. User registers or logs in
2. Backend verifies credentials
3. A JWT token is generated
4. Token must be sent in the `Authorization` header for protected routes
5. Authentication middleware validates the token and injects `userId` into the request

---

##  API Endpoints

### Authentication APIs

| Method | Endpoint | Description |
|------|--------|------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate user and issue JWT |

---

### Slot APIs (Protected)

| Method | Endpoint | Description |
|------|--------|------------|
| GET | `/api/slots` | Fetch all slots for the logged-in user |
| POST | `/api/slots` | Book new slots (accepts an array) |
| DELETE | `/api/slots/:id` | Delete a booked slot |

---

## Backend Folder Structure

```text
src/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
├── index.js


---

##  Security Considerations

* Passwords are hashed using bcrypt
* JWT tokens are validated on every protected request
* User identity is never trusted from the client
* Slot deletion enforces strict ownership checks

---

##  Running the Backend

### Install Dependencies

```bash
npm install
```

### Start Server

```bash
npm run dev
```

---

##  Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

##  Summary

> A secure Node.js backend that dynamically generates batch-based calendars and supports flexible, user-scoped slot booking using JWT-authenticated APIs.

```

---

```
