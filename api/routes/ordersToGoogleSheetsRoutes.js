const express = require("express");
const router = express.Router();
const ordersToGoogleSheets = require("../controllers/ordersToGoogleSheets");

/**
 @swagger
 * /ordersToSheets/createOrUpdate:
 *   post:
 *    summary: Create or Update one order
 *    description: Create or update one order
 *    tags: [OrdersToSheets]
 *    parameters:
 *       - in: path
 *         order: id
 *         required: true
 *         description: Create or update one order by one determinated user
 *         schema:
 *           type: string
 *    responses:
 *      200:
*        description: Create or update one order 
 *        content:
 *          application/json:
 */
router.post("/create/:userId", ordersToGoogleSheets.createOrUpdate);

module.exports = router;
