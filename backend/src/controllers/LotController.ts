import express from 'express'
import { LotModel } from '../models'

class LotController {

    private static instance : LotController;

    private constructor() {}
    
    public static getInstance() : LotController {
        if (!LotController.instance)
            LotController.instance = new LotController();

        return LotController.instance;
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
            res.json(obj)
        })
        .catch( reason => {
            res.status(500).json({
                status : 'error',
                message : reason 
            })
        });


    }
}

export default LotController.getInstance();