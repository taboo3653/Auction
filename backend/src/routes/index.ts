import express from "express";
import bodyParser from 'body-parser'
import socket from "socket.io";
import {  LotController } from '../controllers'
import usersRouter  from './users' 
import { checkAuth } from '../middlewares'
import HtmlError from '../utils/errors/HtmlError';


const createRoutes = (app : express.Express, io: socket.Server) => {

  const lotController = new LotController(io);

  app.use(bodyParser.json());
 // app.use(checkAuth);

  app.use('/users', usersRouter());



  app.get('/lots', lotController.getAll);
  app.get('/lots/:id', lotController.getLotById);
  app.post('/lots',  lotController.create);
  

  app.use((err : any, req: express.Request, res: express.Response, next: express.NextFunction) => {

    if(err instanceof HtmlError)
        return res.status(err.code).json({
            message: err.message
        });
    else
        return res.status(500).json({
            message: "Internal Server Error"
        })

  
})
}

export default createRoutes;