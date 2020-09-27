import { checkJwt } from './../middlewares/checkJwt';
import { Router } from 'express';
import AuthController from '../controllers/authController';
//import { checkJwt } from '../middlewares/checkJwt';
import validateRequest from '../middlewares/validate';
import CreateUserDto from '../dtos/CreateLocalUserDto';
import loginUserDto from '../dtos/LoginLocalUserDto';
import EmptyDto from '../dtos/EmptyDto';
import forgotPasswordDto from '../dtos/forgotPasswordDto';
import CreateGoogleUserDto from '../dtos/CreateGoogleUserDto';
import { extractRefreshToken } from '../middlewares/extractRefreshToken';
import resetPasswordDto from '../dtos/ResetPasswordDto';
import updatePasswordDto from '../dtos/UpdatePasswordDto';

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
router.post('/activate/:activationToken', validateRequest(EmptyDto), AuthController.activateAccount);

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
 *          description: User Logged in successfully
 */
router.post('/localLogin', [validateRequest(loginUserDto)], AuthController.localLogin);
router.post('/googleLogin', [validateRequest(CreateGoogleUserDto)], AuthController.googleLogin);
router.post('/localSignup', [validateRequest(CreateUserDto)], AuthController.localSignUp);
router.post('/googleSignup', [validateRequest(CreateGoogleUserDto)], AuthController.googleSignUp);

/**
 * @swagger
 * path:
 *  /auth/logout:
 *    post:
 *      summary: Logout user
 *      tags: [Authentication and Autherization]
 *      produces:
 *          - application/json
 *      responses:
 *        200:
 *          description: User logged out successfully
 */
router.post('/logout', AuthController.logout);

/**
 * @swagger
 * path:
 *  /auth/refreshToken:
 *    post:
 *      summary: Use the refresh token to obtain a new access token when the access token has expired
 *      tags: [Authentication and Autherization]
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: refresh-token
 *            description: Authentication Token
 *            in: header
 *            required: false
 *            type: string
 *      responses:
 *        200:
 *          description: Reissued access token
 */
router.post('/refreshToken', validateRequest(EmptyDto), extractRefreshToken, AuthController.refreshToken);

/**
 * @swagger
 * path:
 *  /auth/forgotPassword:
 *    post:
 *      summary: Reset password with reset token sent via email
 *      tags: [Authentication and Autherization]
 *      produces:
 *          - application/json
 *      requestBody:
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/forgotPassword DTO'
 *         required: true
 *      responses:
 *        200:
 *          description: Password Reset email sent!
 */
router.post('/forgotPassword', validateRequest(forgotPasswordDto), AuthController.forgotPassword);

/**
 * @swagger
 * path:
 *  /auth/resetPassword:
 *    post:
 *      summary: Reset password with reset token sent via email
 *      tags: [Authentication and Autherization]
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: Auth Token
 *            description: Authentication Token
 *            in: path
 *            required: false
 *            type: string
 *      requestBody:
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/ResetPassword DTO'
 *         required: true
 *      responses:
 *        200:
 *          description: Password Reset successfully!
 */
router.post('/resetPassword/:resetToken', validateRequest(resetPasswordDto), AuthController.resetPassword);

router.post('/updatePassword', validateRequest(updatePasswordDto), checkJwt, AuthController.updatePassword);

export default router;
