// Cargamos el modulo express
const express = require("express");
const router = express.Router();
// Cargamos el controlador del positionUser
const positionUser = require("../controllers/positionUserController");

/**
 @swagger
 * /positionUser:
 *   get:
 *    summary: Devuelve una lista de todos los positionUser.
 *    description: Retrieve a list of positionUser from JSONPlaceholder. Can be used to populate a list of fake positionUser when prototyping or testing an API.
 *    responses:
 *      200:
 *        description: A list of positionUser.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      _id:
 *                        type: integer
 *                        description: Id de positionUser.
 *                        example: 1
 *                      position:
 *                        type: string
 *                        description: Posicion de un usuario.
 *                        example: { "lat": 1, "long":1, "z"}
 *                      usuario:
 *                        type: string
 *                        description: Id de un usuario.
 *                        example: SÑAAS-FGT#$-%DGH$-&$ETG-%&GASD
 */
router.get("/", positionUser.getAll);

/**
 @swagger
 * /positionUser/{positionUserId}:
 *   get:
 *    summary: Devuelve un positionUser.
 *    description: Retrieve a list of positionUser from JSONPlaceholder. Can be used to populate a list of fake positionUser when prototyping or testing an API.
 *    parameters:
 *       - in: path
 *         positionUser: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *    responses:
 *      200:
 *        description: A list of positionUser.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  items:
 *                    type: object
 *                    properties:
 *                      _id:
 *                        type: integer
 *                        description: Id de positionUser.
 *                        example: 1
 *                      position:
 *                        type: string
 *                        description: Posicion de un usuario.
 *                        example: { "lat": 1, "long":1, "z"}
 *                      usuario:
 *                        type: string
 *                        description: Id de un usuario.
 *                        example: SÑAAS-FGT#$-%DGH$-&$ETG-%&GASD
 */
router.get("/user/:userId", positionUser.getByUser);

/**
 @swagger
 * /positionUser/{productosId}:
 *   get:
 *    summary: Devuelve un positionUser.
 *    description: Retrieve a list of positionUser from JSONPlaceholder. Can be used to populate a list of fake positionUser when prototyping or testing an API.
 *    parameters:
 *       - in: path
 *         positionUser: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *    responses:
 *      200:
 *        description: A list of positionUser.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  items:
 *                    type: object
 *                    properties:
 *                      _id:
 *                        type: integer
 *                        description: Id de positionUser.
 *                        example: 1
 *                      position:
 *                        type: string
 *                        description: Posicion de un usuario.
 *                        example: { "lat": 1, "long":1, "z"}
 *                      usuario:
 *                        type: string
 *                        description: Id de un usuario.
 *                        example: SÑAAS-FGT#$-%DGH$-&$ETG-%&GASD
 */
 router.get("/:positionUserId", positionUser.getById);

/**
 * @swagger
 * /positionUser:
 *   post:
 *     summary: Crea un PositionUser.
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                      _id:
 *                        type: integer
 *                        description: Id de positionUser.
 *                        example: 1
 *                      position:
 *                        type: string
 *                        description: Posicion de un usuario.
 *                        example: { "lat": 1, "long":1}
 *                      usuario:
 *                        type: string
 *                        description: Id de un usuario.
 *                        example: SÑAAS-FGT#$-%DGH$-&$ETG-%&GASD
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               position:
 *                 type: string
 *                 description: Posicion de un usuario.
 *                 example: { "lat": 1, "long":1}
 *               usuario:
 *                 type: string
 *                 description: Id de un usuario.
 *                 example: SÑAAS-FGT#$-%DGH$-&$ETG-%&GASD
 */
router.post("/", positionUser.create);

/**
 * @swagger
 * /positionUser/{productosId}:
 *   put:
 *      summary: Edita un PositionUser.
 *      parameters:
 *       - in: path
 *         positionUser: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: The positionUser.
 *                 example: Leanne Graham
 *               position:
 *                 type: string
 *                 description: Posicion de un usuario.
 *                 example: { "lat": 1, "long":1, "z"}
 *               usuario:
 *                 type: string
 *                 description: The positionUser descripcion.
 *                 example: Leanne Graham
 *      responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The positionUser ID.
 *                       example: 0
 *                     position:
 *                       type: string
 *                       description: Posicion de un usuario.
 *                       example: { "lat": 1, "long":1, "z"}
 *                     usuario:
 *                       type: string
 *                       description: Id de un usuario.
 *                       example: SÑAAS-FGT#$-%DGH$-&$ETG-%&GASD
 */
router.put("/:positionUserId", positionUser.updateById);

/**
 @swagger
 * /positionUser/{productosId}:
 *   delete:
 *    summary: Elimina un positionUser.
 *    description: Retrieve a list of positionUser from JSONPlaceholder. Can be used to populate a list of fake positionUser when prototyping or testing an API.
 *    parameters:
 *       - in: path
 *         positionUser: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *    responses:
 *      200:
 *        description: A delete of positionUser.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  items:
 *                    type: object
 *                    properties:
 *                      status:
 *                        type: string
 *                        description: estado.
 *                        example: Camisa Verde
 *                      message:
 *                        type: string
 *                        description: Descripcion del positionUser.
 *                        example: PositionUser deleted successfully!!!
 *                      data:
 *                        type: string
 *                        description: Caracteracteristicas del positionUser.
 *                        example: null
 */
router.delete("/:positionUserId", positionUser.deleteById);

module.exports = router;
