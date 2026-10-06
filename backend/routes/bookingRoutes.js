import express from "express"
import { cancelBooking, createBooking, getAllRooms, getDayBooking } from "../controller/bookingController.js"

const booking=express.Router()

booking.get('/rooms',getAllRooms)
booking.post('/booking',createBooking)
booking.delete('/bookings/:id',cancelBooking)
booking.get('/bookings',getDayBooking)


export default booking