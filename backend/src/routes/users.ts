import express from 'express';
import { createUserValidation, loginUserValidation } from '../utils/validations'
import { UserController } from '../controllers'
import { checkAuth } from '../middlewares'


const usersRouter = () =>{
    const userController = new UserController();

    const router = express.Router();
    
    router.post('/signup', createUserValidation, userController.create);
    router.post('/signin', loginUserValidation, userController.login);
    router.get('/me', checkAuth, userController.getMe);


   

    return router;
}



export default usersRouter;