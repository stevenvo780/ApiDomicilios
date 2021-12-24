const fetch = require("cross-fetch");
const userModel = require("../models/userModel");

module.exports = {
  // Method to retur all orders stored in database
  getSheetsOrders: async (req, res, next) => {
    const user = await userModel.findOne(
      { _id: req.params.userId },
      (err, userInfo) => {
        if (err) {
          next(err);
        } else {
          return userInfo;
        }
      }
    );

    const getSheetsInformation = async () => {
      try {
        let response = await fetch(user.googleSheets);
        const data = await response.json();
        return data;
      } catch (e) {
        console.log(e);
      }
    };
    const sheets = await getSheetsInformation();
    if (sheets) {
      res.json({
        status: 200,
        message: "Everything ok",
        data: { SheetsOrder: sheets },
      });
    } else {
      res.json({
        status: 400,
        message: "Bad Request or Internal Server Error",
        data: null,
      });
    }
  },
};
