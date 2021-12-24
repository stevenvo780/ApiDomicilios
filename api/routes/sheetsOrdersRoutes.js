const express = require("express");
const router = express.Router();
const sheetsOrdersController = require("../controllers/sheetsOrderController");

/**
 * @swagger
 * /sheetsOrder/{sheetsOrderId}:
 *   put:
 *     summary: Get One Sheets Order
 *     tags: [SheetsOrders]
 *     parameters:
 *       - in: path
 *         name: sheetsOrderId
 *         schema:
 *           type: string
 *         required: true
 *         description: Sheets Order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *     responses:
 *       200:
 *         description: Get SheetsOrder
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 */

router.get("/:userId", sheetsOrdersController.getSheetsOrders);
module.exports = router;
