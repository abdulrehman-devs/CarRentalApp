import mongoose from 'mongoose';
import Users from './users.js';
import Cars from './cars.js';

const reviewsSchema = new mongoose.Schema({
    userDetail: {
        type: String,
        required: true
    },
    car: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    }
});

const Reviews = mongoose.model("Reviews", reviewsSchema);

export default Reviews;