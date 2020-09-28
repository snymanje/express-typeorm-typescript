import { Router } from 'express';
import CreateLocalUserWithRoleDto from '../dtos/CreateLocalUserWithRoleDto';
import validateRequest from '../middlewares/validate';
import UserController from '../controllers/userController';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRoles';
import EditUserDto from '../dtos/EditUserDto';

const router = Router();

// Get all users
/**
 * @swagger
 * path:
 *  /user:
 *    get:
 *      summary: Fetches all users
 *      tags: [User CRUD Operations]
 *      produces:
 *          - application/json
 *      responses:
 *        200:
 *          description: All users retreived successfully.
 */
router.get('/', [checkJwt, checkRole(['admin'])], UserController.listAll);

// Get one user
/**
 * @swagger
 * path:
 *  /user/{id}:
 *    get:
 *      summary: Fetches one user
 *      tags: [User CRUD Operations]
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: id
 *            description: User Id
 *            in: path
 *            required: true
 *            type: string
 *      responses:
 *        200:
 *          description: User retreived successfully.
 */
router.get('/:id([0-9]+)', [checkJwt, checkRole(['admin'])], UserController.getOneById);

//Create a new user
/**
 * @swagger
 * path:
 *  /user:
 *    post:
 *      summary: Create a new user
 *      tags: [User CRUD Operations]
 *      produces:
 *          - application/json
 *      requestBody:
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/CreateLocalUserWithRole DTO'
 *         required: true
 *      responses:
 *        200:
 *          description: User created successfully.
 */
router.post('/', validateRequest(CreateLocalUserWithRoleDto), [checkJwt, checkRole(['admin'])], UserController.newUser);

// Edit one user
/**
 * @swagger
 * path:
 *  /user:
 *    patch:
 *      summary: Update a user
 *      tags: [User CRUD Operations]
 *      produces:
 *          - application/json
 *      requestBody:
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/EditUser DTO'
 *         required: true
 *      responses:
 *        200:
 *          description: User updated successfully.
 */
router.patch('/', validateRequest(EditUserDto), [checkJwt, checkRole(['admin'])], UserController.editUser);

//Delete one user
/**
 * @swagger
 * path:
 *  /user/{id}:
 *    delete:
 *      summary: Deletes one user
 *      tags: [User CRUD Operations]
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: id
 *            description: User Id
 *            in: path
 *            required: true
 *            type: string
 *      responses:
 *        200:
 *          description: User deleted successfully.
 */
router.delete('/:id([0-9]+)', [checkJwt, checkRole(['admin'])], UserController.deleteUser);

export default router;
