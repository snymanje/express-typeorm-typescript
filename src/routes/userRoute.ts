import { Router } from 'express';
import UserController from '../controllers/userController';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRoles';

const router = Router();

/**
 * @swagger
 * path:
 *  /user:
 *    get:
 *      summary: Fetches all users
 *      tags: [User CRUD Operations]
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: authorization
 *            description: Authentication Token
 *            in: header
 *            required: false
 *            type: string
 *      responses:
 *        200:
 *          description: All users retreived successfully.
 */
router.get('/', [checkJwt, checkRole(['admin'])], UserController.listAll);

// Get one user
router.get('/:id([0-9]+)', [checkJwt, checkRole(['admin'])], UserController.getOneById);

//Create a new user
router.post('/', [checkJwt, checkRole(['admin'])], UserController.newUser);

//Edit one user
router.patch('/:id([0-9]+)', [checkJwt, checkRole(['admin'])], UserController.editUser);

//Delete one user
router.delete('/:id([0-9]+)', [checkJwt, checkRole(['admin'])], UserController.deleteUser);

export default router;
