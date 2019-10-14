import express from 'express'
import socket from "socket.io";

import { LotModel } from '../models'

class LotController {

    io : socket.Server;

    constructor(io : socket.Server) {
        this.io = io;
    }

    public getLotById = ( req : express.Request, res : express.Response ) => {
        const id : string = req.params.id;

        LotModel
        .findById(id)
        .exec(function (err, lots){
            if (err) {
                return res.status(404).json({
                  message: "Lots not found"
                });
              }
              return res.json(lots);
        })
    }
    
    public getAll = ( req : express.Request, res : express.Response ) => {
        LotModel
        .find()
        .exec(function (err, lots){
            if (err) {
                return res.status(404).json({
                  message: "Lots not found"
                });
              }
              return res.json(lots);
        })
    }
    
    public create = ( req : express.Request, res : express.Response ) => {
        
        const postDate = {
            name: req.body.name,
            description: req.body.description,
            start_price: req.body.start_price,
            current_price: req.body.current_price,
            min_step: req.body.min_step,
            finish_time: req.body.finish_time
        }

        const lot = new LotModel(postDate);
        
        lot
        .save()
        .then( obj => {
            res.json(obj);
            this.io.emit('SERVER:LOT_ADDED');
        })
        .catch( reason => {
            res.status(500).json({
                status : 'error',
                message : reason 
            })
        });


    }
}

export default LotController;