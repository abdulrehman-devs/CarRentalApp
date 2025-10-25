import express from "express";
import Reviews from "../models/reviews.js";
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const {userDetail, car, feedback} = req.body;

    try {
        const review = await Reviews({userDetail, car, feedback});
        await review.save();

        res.status(201).json({message: "Review Saved.", review});
    }
    catch (e) {
        res.status(500).json({message: "Error saving review.", error: e});
    }
});

router.get('/', async (req, res) => {
    try {
        const reviews = await Reviews.find({});
        res.json(reviews);
        res.send("Reviews Fetched.")
    }
    catch (e) {
        res.status(500).json({message: "Error sending reviews.", error: e});
    }
});

export default router;