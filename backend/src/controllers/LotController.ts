import express from 'express'
import socket from "socket.io";

import { asyncHandler } from '../utils'
import { validationResult } from 'express-validator'
import { BidModel, IBid, LotModel, ILot } from '../models'
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
    
    public getLots = asyncHandler(async( req : express.Request, res : express.Response, next: express.NextFunction ) => {

        const isActive = req.query.active;
        const creator = req.query.creator;

        const lotsDocQuery = (isActive === 'true') ? 
        LotModel.find({finishTime : { $gt : Date.now() }}) :
        LotModel.find()

        if(creator &&  mongoose.Types.ObjectId.isValid(creator))
        lotsDocQuery.find({creator : creator})

        const lots = await lotsDocQuery.exec();

        if (lots.length === 0) 
            return next(new HtmlError(404,"Lots not found"));


        const lotsWithMaxBid = await Promise.all(lots.map( async (lot) => {
            const bids = await BidModel.find({lot:lot._id}).sort({value:-1}).exec();

            const currentPrice = (bids.length !== 0) ?  bids[0].value: lot.startPrice;

            return {...lot.toObject(), currentPrice}

        }))


        return res.json(lotsWithMaxBid);
        
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
            minStep: req.body.minStep,
            finishTime: req.body.finishTime,
            images: req.body.images
        });
        
        const lot = await lotDoc.save();

        res.status(201).json(lot);
        this.io.emit('SERVER:LOT_ADDED');

    })
}

export default LotController;