/// <reference path="./custom.d.ts" />

import express from "express";
import { verifyJWTToken } from "../utils/JWT";
import { HtmlError } from '../utils/errors'


export default (req: express.Request, res: express.Response, next: express.NextFunction) => {

  let token = '';

  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') 
    token = req.headers.authorization.split(' ')[1];
  

  verifyJWTToken(token)
    .then((user: any) => {
      req.user = user.data;
      next();
    })
    .catch(() => {
      next(new HtmlError(401,"Invalid auth token provided."))
    });
};