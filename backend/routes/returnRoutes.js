import express from 'express';
import Returns from '../models/returns.js';
import Bookings from '../models/bookings.js';
import Cars from '../models/cars.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/returncar', auth, async (req, res) => {

    try {
        const { bookingId, condition, extraCharges } = req.body;
        const activeBooking = await Bookings.findById(bookingId);

        if (!activeBooking) {
            return res.status(404).json({ message: "No active booking found for this user of this car." });
        }

        const carModel = activeBooking.model;
        const carMake = activeBooking.make;
        const carId = activeBooking.carId;

        const newReturn = new Returns({ bookingId, carMake, carModel, condition, extraCharges });
        await newReturn.save();

        await Cars.findByIdAndUpdate(carId, { booked: false });
        await Bookings.findByIdAndUpdate({_id: bookingId}, { active: false})

        res.status(201).json({ message: "Car returned successfully", newReturn });
    }
    catch (e) {
        res.status(500).json({ message: "Error while returning car", error: e });
    }
});

router.get('/', async (req, res) => {
    try {
        const returns = await Returns.find({});
        res.json(returns);
        res.send("Returns data sent.", returns)
    }
    catch (e) {
        res.status(500).json({ message: "Error sending returns data.", error: e })
    }
});

export default router;
