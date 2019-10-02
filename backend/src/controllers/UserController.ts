import express from 'express'
import { validationResult } from 'express-validator'
import { UserModel, IUser } from '../models'

class UserController {

    private static instance : UserController;

    private constructor() {}
    
    public static getInstance() : UserController {
        if (!UserController.instance)
            UserController.instance = new UserController();

        return UserController.instance;
    }

    public create = ( req : express.Request, res : express.Response ) => {
        
        const postDate  = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }

        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }

        const user : IUser = new UserModel(postDate);
        
        user
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

export default UserController.getInstance();