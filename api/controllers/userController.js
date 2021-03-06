// Cargamos el modelo recien creado
const userModel = require("../models/userModel");
// Cargamos el módulo de bcrypt
const bcrypt = require("bcrypt");
// Cargamos el módulo de jsonwebtoken
const jwt = require("jsonwebtoken");

// Controladores relacionados a los usuarios y la autenticacion
module.exports = {
  // FIXME: Validar que no existe el usuario para poder crearlo
  create: function (req, res, next) {
    userModel.create(
      {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        fechaNacimiento: req.body.fechaNacimiento,
        tipoDocumento: req.body.tipoDocumento,
        documentoIdentidad: req.body.documentoIdentidad,
        password: req.body.password,
      },
      function (err, user) {
        console.log(user);
        const payload = {
          check:  true
         };
        const token = jwt.sign(payload, req.app.get('llave'), {
          expiresIn: "1h",
        });
        if (err) next(err);
        else
          res.json({
            status: 200,
            message: "Usuario agregado exitosamente!!!",
            data: { user, token },
          });
      },
    );
  },
  authenticate: function (req, res, next) {
    if (!req.body.password || !req.body.documentoIdentidad) {
      next();
    }
    userModel.findOne(
      { documentoIdentidad: req.body.documentoIdentidad },
      function (err, userInfo) {
        if (err) {
          next(err);
        } else {
          if (
            userInfo &&
            bcrypt.compareSync(req.body.password, userInfo.password)
          ) {
            const token = jwt.sign(
              { id: userInfo._id },
              req.app.get("secretKey"),
              { expiresIn: "1h" },
            );
            res.json({
              status: 200,
              message: "El usuario ha sido autenticado!!!",
              data: { user: userInfo, token: token },
            });
          } else {
            res.json({
              status: 400,
              message: "Invalido documento de identidad o contraseña",
              data: null,
            });
          }
        }
      },
    );
  },
  // Metodo para actualizar algun registro de la base de datos por ID
  updateById: async function (req, res, next) {
    const dataBody = {};
    Object.keys(req.body).forEach((key) => {
      dataBody[key] = req.body[key];
    });
    if (dataBody.password) {
      // Actualizar hash de la contraseña
      dataBody.password = await bcrypt.hash(dataBody.password, 8);
    }
    // Acualizar el usuario
    userModel.findOneAndUpdate(
      req.params.userId,
      dataBody,
      function (err, user) {
        if (err) next(err);
        else {
          res.json({
            status: "200",
            message: "User updated successfully!!!",
            data: dataBody,
          });
        }
      },
    );
  },
};
