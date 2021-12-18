// Load model
const orderModel = require("../models/orderModel");

// Client to Whatsapp Notification
const whatsappClient = require("twilio")();

// UUID
const { v4: uuidv4, v4 } = require("uuid");

module.exports = {
  // Method to retur all orders stored in database
  getAll: function (req, res, next) {
    orderModel.find({}, (err, orders) => {
      if (err) {
        next(err);
      } else {
        if (orders.length > 0) {
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
    });
  },

  // FIXME: validate that do not exist the user for can create
  create: (req, res, next) => {
    orderModel.create(
      {
        orderNumber: req.body.orderNumber,
        pedido: req.body.pedido,
        nombresYApellidos: req.body.nombresYApellidos,
        cedula: req.body.cedula,
        telefono: req.body.telefono,
        departamento: req.body.departamento,
        ciudad: req.body.ciudad,
        direccion: req.body.direccion,
        correoElectronico: req.body.correoElectronico,
        metodoDePago: req.body.metodoDePago,
        domiciliario: req.body.domiciliario,
        fecha: req.body.fecha,
        cliente: req.body.cliente,
        estado: req.body.estado,
      },
      function (err, order) {
        console.log(order);

        if (err) next(err);
        else {
          res.json({
            status: 200,
            message: "Orden agregada exitosamente!!!",
            data: { order },
          });
          const sendMessage = async () => {
            setTimeout(() => {
              whatsappClient.verify
                .services("VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                .verifications.create({
                  to: `+57${order.telefono}`,
                  channel: "whatsapp",
                })
                .then((verification) => console.log(verification.accountSid));

              whatsappClient.messages
                .create({
                  from: "whatsapp:+14155238886",
                  body: order.pedido,
                  to: `whatsapp:+57${order.telefono}`,
                })
                .then((message) => console.log(message.sid))
                .done();
            }, 10000);
          };

          sendMessage();
        }
      }
    );
  },

  // Method for update any log in database for ID
  updateById: async function (req, res, next) {
    // Update product
    orderModel
      .updateOne({ _id: req.params.orderId }, req.body)
      .then(function (order) {
        res.json({
          status: "200",
          message: "Order updated successfully!!!",
          data: order,
        });
      })
      .catch(function (err) {
        next(err);
      });
  },

  // Method for delete any log in database for ID
  deleteById: async function (req, res, next) {
    // Delete One Order By Id
    orderModel.findOneAndDelete(req.params.orderId, function (err) {
      if (err) next(err);
      else {
        res.json({
          status: "200",
          message: "Order deleted successfully!!!",
        });
      }
    });
  },
};
