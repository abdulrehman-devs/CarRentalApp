import mongoose from 'mongoose';
import Cars from './cars.js'
import Bookings from './bookings.js';

const returnSchema = new mongoose.Schema({
    bookingId: {
        type: String,
        ref: 'Bookings',
        required: true
    },
    carMake: {
        type: String,
        required: true
    },
    carModel: {
        type: String,
        required: true
    },
    returnDate: {
        type: Date,
        default: function () {
            const today = new Date();

            return new Date(today.toISOString().split("T")[0]);
        },
    },
    condition: {
        type: String
    },
    extraCharges: {
        type: Number
    }
});

const Returns = mongoose.model("Returns", returnSchema);

export default Returns;