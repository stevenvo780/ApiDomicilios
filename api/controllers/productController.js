// Load model
const productModel = require('../models/productModel')


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
        })
    },

    // FIXME: validate that do not exist the user for can create
    create: (req, res, next) => {
        productModel.create(
            {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                caracteristicas: req.body.caracteristicas,
                empresa: req.body.empresa,
                valorCU: req.body.valorCU,
            },
            function (err, product) {
                console.log(product);

                if (err) next(err);
                else
                    res.json({
                        status: 200,
                        message: "Producto agregado exitosamente!!!",
                        data: { product },
                    });
            },
        )
    },

    // Method for update any log in database for ID
    updateById: async function (req, res, next) {
        const dataBody = {};
        Object.keys(req.body).forEach((key) => {
            dataBody[key] = req.body[key];
        });
        // Update product
        productModel.findOneAndUpdate(
            req.params.productId,
            dataBody,
            function (err, product) {
                if (err) next(err);
                else {
                    res.json({
                        status: "200",
                        message: "Product updated successfully!!!",
                        data: dataBody,
                    });
                }
            },
        );
    },

    // Method for delete any log in database for ID
    deleteById: async function (req, res, next) {
        const dataBody = {};
        Object.keys(req.body).forEach((key) => {
            dataBody[key] = req.body[key];
        });
        // Update product
        productModel.findOneAndDelete(
            req.params.productId,
            function (err) {
                if (err) next(err);
                else {
                    res.json({
                        status: "200",
                        message: "Product deleted successfully!!!",
                    });
                }
            },
        );
    },
}
