const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     summary: Actualiza un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: Id del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 */
router.put("/update/:userId", userController.updateById);
module.exports = router;
