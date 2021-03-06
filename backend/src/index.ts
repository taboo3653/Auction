import express from "express"; 
import { createServer } from 'http';
import path from 'path';

import dotenv from 'dotenv';

dotenv.config()

import './core/db'
import createRoutes from './routes'
import createSocket from './core/socket';

const app = express();
const http = createServer(app);
const io = createSocket(http);


createRoutes(app, io);

const API_PORT = process.env.PORT || 3001;
if (process.env.NODE_ENV === 'production') {
    app.use(express.static( '../frontend/build' ));

    app.get('*', (req, res) => {
        const rootPath = __dirname.split('/').slice(0,-2).join('/');
        console.log("Root path "+rootPath);
        res.sendFile(path.join(rootPath, 'frontend', 'build', 'index.html')); // relative path
    });
}

http.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));



