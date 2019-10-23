import express from 'express'
import socket from "socket.io";

import { asyncHandler } from '../utils'
import { validationResult } from 'express-validator'
import { BidModel, IBid, LotModel, ILot } from '../models'
import { HtmlError } from '../utils/errors';
import mongoose from 'mongoose'

class BidController {

    io : socket.Server;

    constructor(io : socket.Server) {
        this.io = io;
    }
/*
    public getLotById = asyncHandler(async ( req : express.Request, res : express.Response, next: express.NextFunction ) => {
        const id : string = req.params.id;

        const lot = await LotModel.findById(id).populate('creator','name -_id').exec();

        if(!lot)
            return next(new HtmlError(404,"Lot not found"));
       
        return res.json(lot);
        
    })
    */
    public getBids = asyncHandler(async( req : express.Request, res : express.Response, next: express.NextFunction ) => {

        const lotId = req.query.lotId;
        if(!mongoose.Types.ObjectId.isValid(lotId))
            return next(new HtmlError(422, "Invalid lot id"))

        const bids = await BidModel.find({lot : lotId}).select('value user').populate('user','name').sort({value : -1}).exec();

        if(!bids)
            return next(new HtmlError(404, "Bids not found"))

        return res.json(bids);
        
    })
    
    public create = asyncHandler(async( req : express.Request, res : express.Response, next: express.NextFunction ) => {
        
        const validation = validationResult(req);

        if (!validation.isEmpty())
        return res.status(422).json({
            errors: validation.array()
        })

     
        const maxBid = await BidModel.find({lot : req.body.lot}).sort({value: -1}).exec();

        const maxVal = (maxBid && maxBid.length > 0) ? Number(maxBid[0].value) : 0;

        const lot = await LotModel.findById(req.body.lot).exec();

        if(!lot)
            return next(new HtmlError(422, "Lot not found"));

        const minStep = lot.minStep;

        if(Number(req.body.value) < Math.round(maxVal + minStep) )
            return next(new HtmlError(422, "Too little bid"));
 
        const bidDoc : IBid = new BidModel({
            value : req.body.value,
            user : req.body.user,
            lot : req.body.lot,
        });

        const bid = await bidDoc.save();

        res.status(201).json(bid);
        this.io.in(`LOT/${req.body.lot}`).emit('SERVER:BIDS_UPDATED');

    })
}

export default BidController;