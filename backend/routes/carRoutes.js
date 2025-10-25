import express from 'express';
import Cars from '../models/cars.js';
import auth from '../middleware/auth.js';
import Bookings from '../models/bookings.js';

const router = express.Router();

router.post('/', auth, async (req, res) => {
    const {make, model, year, rentalPrice, chasisNo} = req.body;

    try {
        const carExists = await Cars.findOne({chasisNo});

        if (carExists) {
            return res.status(400).json({message: "Car of this Chasis Number already added."})
        }

        const newCar = new Cars({make, model, year, rentalPrice, chasisNo});
        await newCar.save();

        res.status(201).json({message: "New Car Added.", newCar})
    }
    catch (e) {
        res.status(500).json({message: "Failed to add a car.", e})
    }
});

router.get('/', async (req, res) => {
    try {
        const availableCars = await Cars.find({booked: false});
        res.json(availableCars);
        res.send("Cars Data Fetched")
    }
    catch (e) {
        res.status(500).json({message: "Error fetching cars data", error: e})
    }
})

export default router;