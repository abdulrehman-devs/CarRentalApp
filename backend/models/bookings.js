import mongoose from 'mongoose';
import Users from './users.js'
import Cars from './cars.js';

const bookingsSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cars',
        required: true
    },
    model: {
        type: String,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    pickupDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date,
        required: true
    },
    paymentMode: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
});

const Bookings = mongoose.model("Bookings", bookingsSchema);

export default Bookings;