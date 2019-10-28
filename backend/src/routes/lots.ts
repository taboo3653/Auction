import express from 'express';
import { LotController } from '../controllers'
import { createLotValidation } from '../utils/validations'
import { checkAuth } from '../middlewares'

import socket from "socket.io";


const lotsRouter = (io: socket.Server) =>{
    const lotController = new LotController(io);

    const router = express.Router();
    
    router.get('/', lotController.getLots);
    router.get('/:id', lotController.getLotById);
    router.post('/', checkAuth,createLotValidation, lotController.create);
    router.put('/:id', checkAuth,createLotValidation, lotController.edit)
    return router;
}



export default lotsRouter;