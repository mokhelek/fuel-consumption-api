import pgPromise from 'pg-promise';
import express from 'express';
import 'dotenv/config';
import FuelConsumption from './fuel-consumption.js';
import FuelConsumptionAPI from './fuel-consumption-api.js';
import cors from "cors"; 

const pgp = pgPromise();

const connectionOptions = {
    connectionString: process.env.DATABASE_URL || 'postgres://fuel:fuel@localhost:5432/fuel_consumption',
    ssl: process.env.NODE_ENV === 'production', // Enable SSL in production
};

const db = pgp(connectionOptions);

const fuelConsumption = FuelConsumption(db);
const fuelConsumptionAPI = FuelConsumptionAPI(fuelConsumption)

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.get('/api/vehicles', fuelConsumptionAPI.vehicles);
app.get('/api/vehicle', fuelConsumptionAPI.vehicle);
app.post('/api/vehicle', fuelConsumptionAPI.addVehicle);
app.post('/api/refuel', fuelConsumptionAPI.refuel);

app.listen(PORT, () => console.log(`App started on port: ${PORT}`));

