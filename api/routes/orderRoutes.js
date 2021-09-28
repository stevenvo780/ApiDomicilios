const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

/**
 @swagger
 * /order/create:
 *   post:
 *    summary: Create one Order
 *    description: Create one order and store on db
 *    tags: [Products]
 *    parameters:
 *       - in: path
 *         order: id
 *         required: true
 *         description: Numeric ID of the order to retrieve.
 *         schema:
 *           type: string
 *    responses:
 *      200:
 *        description: A list of orders.
 *        content:
 *          application/json:
 */
router.post("/create", orderController.create);


/**
 * @swagger
 * /order/{orderId}:
 *   put:
 *     summary: Update one Order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: Order Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *     responses:
 *       200:
 *         description: Order Updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 */

 router.put("/update/:orderId", orderController.updateById);

/**
 * @swagger
 * /order/{orderId}:
 *   put:
 *     summary: Delete one order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: order Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *     responses:
 *       200:
 *         description: Order Deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 */

 router.delete("/delete/:orderId", orderController.deleteById);




 /**
  * @swagger
  * /order/{orderId}:
  *   put:
  *     summary: Update one Order
  *     tags: [Orders]
  *     parameters:
  *       - in: path
  *         name: orderId
  *         schema:
  *           type: string
  *         required: true
  *         description: Order Id
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *     responses:
  *       200:
  *         description: Order Updated
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               items:
  */


 router.get("/", orderController.getAll);
 module.exports = router;