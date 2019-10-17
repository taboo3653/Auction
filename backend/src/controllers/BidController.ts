import express from 'express'
import socket from "socket.io";

import { asyncHandler } from '../utils'
import { validationResult } from 'express-validator'
import { BidModel, IBid } from '../models'
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
    
    public create = asyncHandler(async( req : express.Request, res : express.Response ) => {
      /*  
        const validation = validationResult(req);

        if (!validation.isEmpty())
        return res.status(422).json({
            errors: validation.array()
        })*/


        const bidDoc : IBid = new BidModel({
            value : req.body.value,
            user : req.body.user,
            lot : req.body.lot,
        });
        
      
        this.io.in(`LOT/${req.body.lot}`).emit('SERVER:BIDS_UPDATED');
        
        const bid = await bidDoc.save();

        res.status(201).json(bid);

       
    })
}

export default BidController;