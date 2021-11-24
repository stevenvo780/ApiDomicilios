// Load model
const categoriaProductModel = require("../models/categoriaProductoModel");

// Controllers with relation to category products
module.exports = {
  // Method to retur all products stored in database
  getAll: function (req, res, next) {
    categoriaProductModel.find({}, (err, categoryProduct) => {
      if (err) {
        next(err);
      } else {
        res.json({
          status: "200",
          message: "Category's Products list found!!!",
          data: { CategoryProducts: categoryProduct },
        });
      }
    });
  },

  // Create a new category product
  create: (req, res, next) => {
    categoriaProductModel.create(
      {
        nombre: req.body.nombre,
      },
      function (err, categoryProduct) {
        if (err) next(err);
        else
          res.json({
            status: 200,
            message: "Category Prouct added Succesfully!!!",
            data: { categoryProduct },
          });
      }
    );
  },

  // Method for update any category product in the Database
  updateById: async function (req, res, next) {
    // Update product
    categoriaProductModel
      .updateOne({ _id: req.params.categoryProductId }, req.body)
      .then(function (categoryProduct) {
        res.json({
          status: "200",
          message: "Category Product updated successfully!!!",
          data: categoryProduct,
        });
      })
      .catch(function (err) {
        if (err) next(err);
      });
  },

  // Method for delete any category product in the Database
  deleteById: async function (req, res, next) {
    categoriaProductModel
      .deleteOne({ _id: req.params.categoryProductId })
      .then(function () {
        res.json({
          status: "200",
          message: "Category Product deleted successfully!!!",
        });
      })
      .catch((err) => {
        if (err) next(err);
      });
  },
};
