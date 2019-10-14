import express from "express"; 
import { createServer } from 'http';
import dotenv from 'dotenv';

dotenv.config()

import './core/db'
import createRoutes from './routes'
import createSocket from './core/socket';

const app = express();
const http = createServer(app);
const io = createSocket(http);


createRoutes(app, io);

const API_PORT = 3001;

http.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));



