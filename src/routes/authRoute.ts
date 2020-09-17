import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { checkJwt } from '../middlewares/checkJwt';
import validateRequest from '../middlewares/validate';
import CreateUserDto from '../dtos/createUser';
import loginUserDto from '../dtos/loginUser';

const router = Router();

router.post('/activate/:activationToken', AuthController.activateAccount);
router.post('/localLogin', [validateRequest(loginUserDto)], AuthController.localLogin);
router.post('/localSignup', [validateRequest(CreateUserDto)], AuthController.localSignUp);

//Change my password
router.post('/change-password', [checkJwt], AuthController.changePassword);

export default router;
