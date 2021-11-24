// Load model
const productModel = require("../models/productModel");

// Controllers with relation to users and authentication
module.exports = {
  // Method to retur all products stored in database
  getAll: function (req, res, next) {
    productModel.find({}, (err, products) => {
      if (err) {
        next(err);
      } else {
        res.json({
          status: "200",
          message: "Products list found!!!",
          data: { Products: products },
        });
      }
    });
  },

  // Method for create one product
  create: (req, res, next) => {
    productModel.create(
      {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        variedades: req.body.variedades,
        precio: req.body.precio,
        ocultar: req.body.ocultar,
        categoria: req.body.categoria,
        imagen: req.body.imagen,
        user: req.body.user,
      },
      function (err, product) {
        console.log(product);

        if (err) next(err);
        else
          res.json({
            status: 200,
            message: "Product Added Succesfully!!!",
            data: { product },
          });
      },
    );
  },

  // Method for update any product in database for ID
  updateById: async function (req, res, next) {
    // Update product
    productModel
      .updateOne({ _id: req.params.productId }, req.body)
      .then(function (product) {
        res.json({
          status: "200",
          message: "Product updated successfully!!!",
          data: product,
        });
      })
      .catch(function (err) {
        if (err) next(err);
      });
  },

  // Method for delete any log in database for ID
  deleteById: async function (req, res, next) {
    productModel
      .deleteOne({ _id: req.params.productId })
      .then(function () {
        res.json({
          status: "200",
          message: "Product deleted successfully!!!",
        });
      })
      .catch((err) => {
        if (err) next(err);
      });
  },
};
