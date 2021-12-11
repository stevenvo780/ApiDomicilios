// Load model
const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");

// Google SpreadSheet
const { GoogleSpreadsheet } = require("google-spreadsheet");

// UUID
const { v4: uuidv4, v4 } = require("uuid");

module.exports = {
  createOrUpdate: async (req, res, next) => {
    // Get User by req.params.userId
    const user = await userModel.findOne(
      { _id: req.params.userId },
      (err, user) => {
        if (err) next(err);
        else return user;
      }
    );

    // Get Order by client.id in req.params.userId
    const orders = await orderModel.find(
      { "cliente.id": req.params.userId },
      (err, orders) => {
        if (err) next(err);
        else return orders;
      }
    );

    console.log("Order by user in our db", orders);

    // Get Sheets by user in req.params.userId
    const getSpreadSheet = async () => {
      const doc = new GoogleSpreadsheet(
        user.googleSheets.spreadsheet.spreadsheet_id
      );
      try {
        await doc.useServiceAccountAuth({
          client_email: user.googleSheets.connection.client_email,
          private_key: user.googleSheets.connection.private_key.replace(
            /\\n/g,
            "\n"
          ),
        });

        // Loads document properties and worksheets
        await doc.loadInfo();

        //const sheet = doc.sheetsById[user.googleSheets.spreadsheet.sheet_id];
        const sheet = doc.sheetsById["0"];
        const rows = await sheet.getRows();
        return rows;
      } catch (e) {
        console.error("Error", e);
      }
    };
    const sheets = await getSpreadSheet();

    const sheetsByUser = sheets.map((sheet) => {
      return {
        orderNumber: sheet._rawData[0],
        fecha: sheet._rawData[1],
        cliente: sheet._rawData[2],
        domiciliario: sheet._rawData[3],
        pedido: sheet._rawData[4],
        direccion: sheet._rawData[5],
        estado: sheet._rawData[6],
      };
    });

    // Validate if the orders exits
    // If don't exits create. Of Course in our db
    sheetsByUser.map(async (sheet) => {
      orders.map(async (order) => {
        if (sheet.orderNumber === order.orderNumber) {
          // I need validate if this order number only matches oone time
          // Update Order
          orderModel
            .updateOne(
              { orderNumber: sheet.orderNumber },
              {
                fecha: sheet.fecha,
                cliente: {
                  id: order.cliente.id,
                  name: sheet.cliente,
                },
                domiciliario: {
                  id: order.domiciliario.id,
                  name: sheet.domiciliario,
                },
                pedido: sheet.pedido,
                direccion: sheet.direccion,
                estado: sheet.estado,
              }
            )
            .then((order) => {
              res.json({
                status: "200",
                message: "Order updated successfully!!!",
                data: order,
              });
            })
            .catch((err) => {
              next(err);
            });
        } else if (sheet.orderNumer !== order.orderNumber) {
          const cliente = await userModel.findOne(
            { nombre: sheet.cliente },
            (err, user) => {
              if (err) next(err);
              else return user;
            }
          );

          const domiciliario = await userModel.findOne(
            { nombre: sheet.domiciliario },
            (err, user) => {
              if (err) next(err);
              else return user;
            }
          );
          // Create a new order
          orderModel.create(
            {
              orderNumber: sheet.orderNumber,
              fecha: sheet.fecha,
              cliente: {
                id: cliente._id,
                name: cliente.nombre,
              },
              domiciliario: {
                id: domiciliario._id,
                name: domiciliario.nombre,
              },
              pedido: sheet.pedido,
              direccion: sheet.direccion,
              estado: sheet.estado,
            },
            (err, order) => {
              if (err) next(err);
              else
                res.json({
                  status: 200,
                  message: "Order Added Succesfully",
                  data: { order },
                });
            }
          );
        }
      });
    });

    // Validate if order can be update
    // If one orderNumber match with the order's db orderName field. Update the rest of data

    // Validate redundances
    // If one orderNumber exists more than 3 times

    // If there are more than 0 order number don't do nothing

    res.json({
      status: 200,
      message: "Orden agregada exitosamente!!!",
      data: { orders },
    });
  },
};
