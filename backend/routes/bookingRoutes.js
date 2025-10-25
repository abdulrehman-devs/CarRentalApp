import express from "express";
import Bookings from "../models/bookings.js";
import Cars from '../models/cars.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/:userId', auth, async (req, res) => {
    try {
        const userId = req.params.userId;
        const bookings = await Bookings.find({userId, active: true});
        
        if (!bookings) {
            return res.status(400).json({message: "This user has no bookings currently."})
        }

        res.status(200).json({message: "Bookings Data sent.", bookings});
    }
    catch (e) {
        res.status(500).json({message: "Error sending booking data", error: e})
    }
});

router.post('/bookacar/:carId', auth, async (req, res) => {
    const { pickupDate, returnDate, paymentMode } = req.body;
    const { carId } = req.params;
    const userId = req.user.id;

    try {
        const carDetails = await Cars.findById(carId);

        if (!carDetails) {
            return res.status(404).json({ message: "Car not found." });
        }

        const newBooking = new Bookings({ userId, carId, model: carDetails.model, make: carDetails.make, pickupDate, returnDate, paymentMode });

        await newBooking.save();
        await Cars.findByIdAndUpdate(carId, { booked: true });

        res.status(201).json({ message: "Car Booking Confirmed.", newBooking });
    } 
    catch (e) {
        res.status(500).json({ message: "Error while booking your car.", error: e.message });
    }
});


export default router;