import express from 'express';
import jwt from 'jsonwebtoken';
import Users from '../models/users.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, email, password, licenseNo } = req.body;

    try {
        const userExists = await Users.findOne({ email });
        const licenseExists = await Users.findOne({ licenseNo })

        if (userExists) {
            return res.status(206).json({ message: "User already exists with this email." })
        }

        else if (licenseExists) {
            return res.status(205).json({ message: "User with this license number already exists."})
        }

        const newUser = new Users({ name, email, password, licenseNo });
        await newUser.save();

        res.status(201).json({ message: "User Created Successfully", newUser })
    }
    catch (e) {
        res.status(500).json({ message: "Error Creating User.", error: e })
    }

});

router.post ('/signin', async (req, res) => {
    const {email, password} = req.body;

    try {
        const userExists = await Users.findOne({email});

        if (userExists) {
            if (userExists.password === password) {
                const token = jwt.sign({id: userExists._id},  "SECRET_KEY", { expiresIn: '30m'})

                res.status(200).json({message: "Logged In", token});
            }
            else {
                res.status(401).json({message: "Password Incorrect"});
            }
        }
        else {
            res.status(404).json({message: "User with this email doesn't exist."})
        }
    }
    catch (e) {
        res.status(500).json({message: "Error Logging in", error: e})
    }
});

export default router;
 