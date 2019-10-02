import express from "express";
import './core/db'
import createRoutes from './core/routes'

const app = express();



createRoutes(app);

const API_PORT = 3001;

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));



