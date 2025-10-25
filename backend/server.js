import express from 'express';
import cors from 'cors';
import connectDB from './config/connection.js';
import Cars from './models/cars.js';
import userRoutes from './routes/userRoutes.js';
import carRoutes from './routes/carRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import returnRoutes from './routes/returnRoutes.js';

const PORT = 2000;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/cars', carRoutes);
app.use('/bookings', bookingRoutes);
app.use('/reviews', reviewRoutes);
app.use('/returns', returnRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at port ${PORT}`)
    })
});