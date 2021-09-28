const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

/**
 @swagger
 * /products/create:
 *   post:
 *    summary: Create one product
 *    description: Create one product and store on db
 *    tags: [Products]
 *    parameters:
 *       - in: path
 *         producto: id
 *         required: true
 *         description: Numeric ID of the product to retrieve.
 *         schema:
 *           type: string
 *    responses:
 *      200:
 *        description: A list of products.
 *        content:
 *          application/json:
 */
router.post("/create", productController.create);


/**
 * @swagger
 * /products/{productId}:
 *   put:
 *     summary: Update one product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: Product Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *     responses:
 *       200:
 *         description: Product Updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 */

 router.put("/update/:productId", productController.updateById);

/**
 * @swagger
 * /products/{productId}:
 *   put:
 *     summary: Delete one product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: Product Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *     responses:
 *       200:
 *         description: Product Deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 */

 router.delete("/delete/:productId", productController.deleteById);




 /**
  * @swagger
  * /product/{productId}:
  *   put:
  *     summary: Update one Product
  *     tags: [Products]
  *     parameters:
  *       - in: path
  *         name: productId
  *         schema:
  *           type: string
  *         required: true
  *         description: Product Id
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *     responses:
  *       200:
  *         description: Product Updated
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               items:
  */


 router.get("/", productController.getAll);
 module.exports = router;