import { Router } from 'express';
import AuthController from '../controllers/authController';
//import { checkJwt } from '../middlewares/checkJwt';
import validateRequest from '../middlewares/validate';
import CreateUserDto from '../dtos/createUser';
import loginUserDto from '../dtos/loginUser';
import CreateGoogleUserDto from '../dtos/CreateGoogleUserDto';

const router = Router();

router.post('/activate/:activationToken', AuthController.activateAccount);
router.post('/localLogin', [validateRequest(loginUserDto)], AuthController.localLogin);
router.post('/googleLogin', [validateRequest(CreateGoogleUserDto)], AuthController.googleLogin);
router.post('/localSignup', [validateRequest(CreateUserDto)], AuthController.localSignUp);
router.post('/googleSignup', [validateRequest(CreateGoogleUserDto)], AuthController.googleSignUp);

export default router;
