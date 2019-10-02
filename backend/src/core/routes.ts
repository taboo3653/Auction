import express from "express";
import bodyParser from 'body-parser'
import { UserController, LotController } from '../controllers'
import { createUserValidation } from '../utils/validations'


const createRoutes = (app : express.Express) => {
   // app.get('/market' , );

   app.use(bodyParser.json());

   app.post('/user/create',  UserController.create);

   app.get('/lot', LotController.getAll);
   app.post('/lot/create',  LotController.create);

  // const lotController = new LotController();
}

export default createRoutes;