const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

/**
 @swagger
 * /user/register:
 *   post:
 *    summary: Registra un usuario.
 *    description: Registra un usuario y devuelve un token de acceso.
 *    tags: [Users]
 *    parameters:
 *       - in: path
 *         producto: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *    responses:
 *      200:
 *        description: A list of productos.
 *        content:
 *          application/json:
 */
router.post("/register", userController.create);

/**
 * @swagger
 * /user/authenticate:
 *   post:
 *    tags: [Users]
 *    summary: Devuelve token y usuario luego de autenticar.
 *    description: Retrieve a list of productos from JSONPlaceholder. Can be used to populate a list of fake productos when prototyping or testing an API.
 *    parameters:
 *       - in: body
 *         name: documentoId
 *         required: true
 *         description: Numero de documento.
 *         schema:
 *           type: string
 *       - in: body
 *         name: contraseña
 *         required: true
 *         description: Contraseña.
 *         schema:
 *           type: string
 *    responses:
 *      200:
 *        description: A list of productos.
 *        content:
 *          application/json
 */
router.post("/authenticate", userController.authenticate);
module.exports = router;
