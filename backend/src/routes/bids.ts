import express from 'express';
import { BidController } from '../controllers'
import { checkAuth } from '../middlewares'
import socket from "socket.io";


const bidsRouter = (io: socket.Server) =>{
    const bidController = new BidController(io);

    const router = express.Router();
    
    router.get('/', bidController.getBids);
   // router.get('/:id', bidController.getLotById);
    router.post('/',  bidController.create);
    
    return router;
}



export default bidsRouter;