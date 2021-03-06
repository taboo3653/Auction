import express from "express";
import bodyParser from 'body-parser'
import socket from "socket.io";
import {  LotController } from '../controllers'
import usersRouter  from './users' 
import lotsRouter  from './lots' 
import bidsRouter  from './bids' 


import { checkAuth } from '../middlewares'
import HtmlError from '../utils/errors/HtmlError';
import  mongoose  from 'mongoose'


const createRoutes = (app : express.Express, io: socket.Server) => {

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json());

  app.use('/api/users', usersRouter());
  app.use('/api/lots', lotsRouter(io));
  app.use('/api/bids', bidsRouter(io));

  
  app.use((err : any, req: express.Request, res: express.Response, next: express.NextFunction) => {

    if(err instanceof HtmlError)
        return res.status(err.code).json({
            message: err.message
        });
    else if(err instanceof SyntaxError)
        return res.status(400).json({
            message: "Bad request"
        });
    else if(err instanceof mongoose.Error.ValidationError)
        return res.status(422).json(err);
    else 
    {
        console.error(err.stack);
        return res.status(500).json({
            message: "Internal server error"
        });
    }

  
})
}

export default createRoutes;