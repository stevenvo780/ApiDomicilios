// Load model
const orderModel = require('../models/orderModel')

module.exports = {
    // Method to retur all orders stored in database
    getAll: function (req, res, next) {
        orderModel.find({}, (err, orders) => {
            if (err) {
                next(err);
              } else {
                  if(orders.length > 0 ) {
                    res.json({
                        status: "200",
                        message: "Orders list found!!!",
                        data: { Orders: orders },
                      });
                  } else {
                    res.json({
                        status: "400",
                        message: "Orders list not found!!!",
                      });
                  }
                
              }
        })
    },

    // FIXME: validate that do not exist the user for can create
    create: (req, res, next) => {
        orderModel.create(
            {
                fecha: req.body.fecha,
                cliente: req.body.cliente,
                domiciliario: req.body.domiciliario,
                productos: req.body.productos,
                direccion: req.body.direccion,
            },
            function (err, order) {
                console.log(order);

                if (err) next(err);
                else
                    res.json({
                        status: 200,
                        message: "Orden agregada exitosamente!!!",
                        data: { order },
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
        orderModel.findOneAndUpdate(
            req.params.orderId,
            dataBody,
            function (err, order) {
                if (err) next(err);
                else {
                    res.json({
                        status: "200",
                        message: "Order updated successfully!!!",
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
        orderModel.findOneAndDelete(
            req.params.orderId,
            function (err) {
                if (err) next(err);
                else {
                    res.json({
                        status: "200",
                        message: "Order deleted successfully!!!",
                    });
                }
            },
        );
    },
}
