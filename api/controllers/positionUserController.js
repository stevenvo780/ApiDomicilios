const PositionUser = require("../models/positionUserModel");
module.exports = {
  // Metodo para la busqueda de positionUsers por ID
  getById: function (req, res, next) {
    console.log(req.body);
    PositionUser.findById(req.params.positionUserId, function (err, positionUser) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: "200",
          message: "PositionUser found!!!",
          data: positionUsers,
        });
      }
    });
  },
  // Metodo para retornar todos los positionUsers registrados en la base de datos
  getAll: function (req, res, next) {
    let productosList = [];
    PositionUser.find({}, function (err, positionUsers) {
      if (err) {
        next(err);
      } else {
        for (let positionUser of positionUsers) {
          productosList.push(positionUser);
        }
        res.json({
          status: "200",
          message: "PositionUser list found!!!",
          data: { positionUsers: productosList },
        });
      }
    });
  },
  // Metodo para actualizar algun registro de la base de datos por ID
  updateById: function (req, res, next) {
    PositionUser.findOneAndUpdate(
      req.params.positionUserId,
      req.body,
      function (err, positionUser) {
        if (err) next(err);
        else {
          res.json({
            status: "200",
            message: "PositionUser updated successfully!!!",
            data: positionUser,
          });
        }
      },
    );
  },
  // Metodo para eliminar algun registro de la base de datos por ID
  deleteById: function (req, res, next) {
    PositionUser.findByIdAndRemove(
      req.params.positionUserId,
      function (err, positionUser) {
        if (err) next(err);
        else {
          res.json({
            status: "200",
            message: "PositionUser deleted successfully!!!",
            data: null,
          });
        }
      },
    );
  },
  //Metodo para crear algun registro nuevo
  create: function (req, res, next) {
    PositionUser.create(req.body, function (err, result) {
      if (err) next(err);
      else
        res.json({
          status: "200",
          message: "PositionUser added successfully!!!",
          data: result,
        });
    });
  },
};