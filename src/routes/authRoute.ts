import { Router } from 'express';
import AuthController from '../controllers/authController';
//import { checkJwt } from '../middlewares/checkJwt';
import validateRequest from '../middlewares/validate';
import CreateUserDto from '../dtos/createUser';
import loginUserDto from '../dtos/loginUser';
import CreateGoogleUserDto from '../dtos/CreateGoogleUserDto';

const router = Router();

/**
 * @swagger
 * path:
 *  /auth/activate/{activationToken}:
 *    post:
 *      summary: Activate Account after signup
 *      tags: [Authentication and Autherization]
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: activationToken
 *            description: Sent via E-Mail
 *            in: path
 *            required: true
 *            type: string
 *      responses:
 *        200:
 *          description: Account successfully activated.
 */
router.post('/activate/:activationToken', AuthController.activateAccount);

/**
 * @swagger
 * path:
 *  /auth/localLogin:
 *    post:
 *      summary: Login with local username and password
 *      tags: [Authentication and Autherization]
 *      produces:
 *          - application/json
 *      requestBody:
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/LoginUserDto'
 *         required: true
 *      responses:
 *        200:
 *          description: An users object
 */
router.post('/localLogin', [validateRequest(loginUserDto)], AuthController.localLogin);
router.post('/googleLogin', [validateRequest(CreateGoogleUserDto)], AuthController.googleLogin);
router.post('/localSignup', [validateRequest(CreateUserDto)], AuthController.localSignUp);
router.post('/googleSignup', [validateRequest(CreateGoogleUserDto)], AuthController.googleSignUp);

export default router;
