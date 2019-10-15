import express, { Express } from 'express'
import { validationResult } from 'express-validator'
import { UserModel, IUserModel } from '../models'
import { asyncHandler } from '../utils'
import {  HtmlError } from '../utils/errors'
import mailer from '../core/mailer'



class UserController {

    constructor() { }

    public getMe = asyncHandler(async (req: any, res: express.Response, next: express.NextFunction) => {

        const id: string = req.user._id;
        const user = await UserModel.findById(id).exec();

        if (!user)
            return next(new HtmlError(404, "User not found"));

        res.json(user);
    })

    public create = asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {

        const validation = validationResult(req);

        if (!validation.isEmpty())
            return res.status(422).json({
                errors: validation.array()
            })

        const user: IUserModel = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });

        const data = await user.save();

        const msg = {
            from: 'admin@test.com',
            to: req.body.email,
            subject: 'Подтверждение почты Auction',
            html: `Для того, чтобы подтвердить почту, перейдите <a href="http://localhost:3000/signup/verify?hash=${user.confirm_hash}">по этой ссылке</a>`,
        };

        mailer.sendMail(msg);
  
        res.status(201).json(data)
    })

    public verify = asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {

        const hash = req.query.hash;

        if (!hash)
            return next(new HtmlError(400,"Invalid hash"));


        let user = await UserModel.findOne({ confirm_hash: hash }).exec();
        
        if(!user)
            return next(new HtmlError(400,"Invalid hash"));

        user = await user.save();
   
        if (user)
            user.confirmed = true;

        res.json({
            message: 'Success!',
        });

    })

    public login = asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {

        const validation = validationResult(req);

        if (!validation.isEmpty()) {
            return res.status(422).json({
                errors: validation.array()
            })
        }

        const email = req.body.email;
        const password = req.body.password;

        const user = await UserModel.findOne({ email }).exec();

        if (!user)
            return next(new HtmlError(404, "User not found"));

        const isMatch = user.comparePasswords(password);

        if (isMatch) {
            const token = user.generateGWT();
            res.json({
                token
            });
        }
        else {
            return next(new HtmlError(401, "Incorrect password"));
        }

    })
}




export default UserController;