import express from 'express'
import socket from "socket.io";

import { asyncHandler } from '../utils'
import { validationResult } from 'express-validator'
import { LotModel, ILot } from '../models'
import { HtmlError } from '../utils/errors';
import mongoose from 'mongoose'

class LotController {

    io : socket.Server;

    constructor(io : socket.Server) {
        this.io = io;
    }

    public getLotById = asyncHandler(async ( req : express.Request, res : express.Response, next: express.NextFunction ) => {
        const id : string = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(id))
            return next(new HtmlError(422, "Invalid lot id"))



        const lot = await LotModel.findById(id).populate('creator','name').exec();

        if(!lot)
            return next(new HtmlError(404,"Lot not found"));
       
        return res.json(lot);
        
    })
    
    public getAll = asyncHandler(async( req : express.Request, res : express.Response, next: express.NextFunction ) => {

        const isActive = req.query.active;

        const lots = (isActive === 'true') ? 
        await LotModel.find({finishTime : { $gt : Date.now() }}).exec() :
        await LotModel.find().exec();

        if (!lots) 
            return next(new HtmlError(404,"Lots not found"));

        return res.json(lots);
        
    })
    
    public create = asyncHandler(async( req : express.Request, res : express.Response ) => {
        
        const validation = validationResult(req);

        if (!validation.isEmpty())
        return res.status(422).json({
            errors: validation.array()
        })

        const lotDoc : ILot = new LotModel({
            name: req.body.name,
            description: req.body.description,
            creator:req.body.creator,
            startPrice: req.body.startPrice,
            currentPrice: req.body.currentPrice,
            minStep: req.body.minStep,
            finishTime: req.body.finishTime
        });
        
        const lot = await lotDoc.save();

        res.status(201).json(lot);
        this.io.emit('SERVER:LOT_ADDED');

    })
}

export default LotController;