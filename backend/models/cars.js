import mongoose from 'mongoose';

const carsSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    rentalPrice: {
        type: Number,
        required: true
    },
    chasisNo: {
        type: Number,
    },
    booked: {
        type: Boolean,
        default: false
    }
});

const Cars = mongoose.model("Cars", carsSchema);

export default Cars;