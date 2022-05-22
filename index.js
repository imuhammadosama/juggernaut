import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import multer from 'multer';

// Route Imports
import userRoute from './routes/user.routes.js';
import clientRoute from './routes/client.routes.js';
import loadRoute from './routes/load.routes.js';
import driverRoute from './routes/driver.routes.js';
import vehicleRoute from './routes/vehicle.routes.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/v1/api/clients', clientRoute);
app.use('/v1/api/users', userRoute);
app.use('/v1/api/loads', loadRoute);
app.use('/v1/api/drivers', driverRoute);
app.use('/v1/api/vehicles', vehicleRoute);
app.use('*', (req, res) => {
  res.send('API Not Found!');
});

const port = process.env.PORT || 8000;
const uri = process.env.DB_CONNECT;

mongoose
  .connect(uri)
  .catch((error) => {
    console.log(error);
  })
  .then(
    app.listen(port, () => {
      console.log(`Server is listening to PORT http://localhost:${port}/`);
    })
  );
