const express = require("express");
const router = express.Router();
const categoryProductController = require("../controllers/categoriaProductoController");

/**
 @swagger
 * /categoryProducts/create:
 *   post:
 *    summary: Create one category product
 *    description: Create one category product and store on db
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
 *        description: A list of category products.
 *        content:
 *          application/json:
 */
router.post("/", categoryProductController.create);

/**
 * @swagger
 * /categoryProducts/{categoryProductId}:
 *   put:
 *     summary: Update one category product
 *     tags: [Category Products]
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

router.put("/:categoryProductId", categoryProductController.updateById);

/**
 * @swagger
 * /categoryProduct/{categoryProductId}:
 *   put:
 *     summary: Delete one category product
 *     tags: [Category Products]
 *     parameters:
 *       - in: path
 *         name: categoryProductId
 *         schema:
 *           type: string
 *         required: true
 *         description: Category Product Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *     responses:
 *       200:
 *         description: Category Product Deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 */

router.delete("/:categoryProductId", categoryProductController.deleteById);

/**
 * @swagger
 * /categoryProduct/{categoryProductId}:
 *   put:
 *     summary: Update one Category Product
 *     tags: [Category Products]
 *     parameters:
 *       - in: path
 *         name: categoryProductId
 *         schema:
 *           type: string
 *         required: true
 *         description: Category Product Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *     responses:
 *       200:
 *         description: Category Product Updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 */

router.get("/", categoryProductController.getAll);
module.exports = router;
