const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *       example:
 *         name: Example Todo
 *     NotFoundError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *       example:
 *         error: Todo not found
 */

/**
 * @swagger
 * /todo:
 *   get:
 *     summary: Get all todos
 *     tags: [Todo]
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: Internal Server Error
 */

router.get('/', todoController.getTodos);

/**
 * @swagger
 * /todo:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       '201':
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       '500':
 *         description: Internal Server Error
 */

router.post('/', todoController.createTodo);

/**
 * @swagger
 * /todo/{id}:
 *   put:
 *     summary: Update a todo by ID
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Todo ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       '200':
 *         description: Todo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       '404':
 *         description: Todo not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundError'
 *       '500':
 *         description: Internal Server Error
 */

router.put('/:id', todoController.updateTodo);

/**
 * @swagger
 * /todo/{id}:
 *   delete:
 *     summary: Delete a todo by ID
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Todo ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Todo deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       '404':
 *         description: Todo not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundError'
 *       '500':
 *         description: Internal Server Error
 */

router.delete('/:id', todoController.deleteTodo);

module.exports = router;
