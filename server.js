require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "127.0.0.1";
const mongoose = require("./config/database/config");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
const swaggerUi = require("swagger-ui-express");
const swaggerInfo = require("./swaggerInfo");
app.set("secretKey", process.env.JWT || "CalveSecreta"); // Clave Secreta para nuestro JWT
const configs = require('./config/configs')


// Instancia de base de datos mongoDB con mongoose
mongoose.connection.on(
  "error",
  console.error.bind(console, "Error de conexion en MongoDB"),
);

app.set('llave', configs.llave)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerInfo));
// Para acceder a las rutas de peliculas hemos definido middleware para validar al usuario.
function private(req, res, next) {
  let token = "";
  if (req.headers.authorization) {
    token = req.headers.authorization.substring(7);
  }

  jwt.verify(token, req.app.get("secretKey"), function (err, decoded) {
    if (err) {
      res.json({ status: 500, message: err.message, data: null });
    } else {
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
}

const positionUserRoutes = require("./api/routes/positionUserRoutes"); // Importar rutas de produtos
const userPrivateRoutes = require("./api/routes/userPrivateRoutes"); // Importar rutas de usuarios
const userPublicRoutes = require("./api/routes/userPublicRoutes"); // Importar rutas de usuarios
const productRoutes = require('./api/routes/productRoutes') // Import product routes
const orderRoutes = require('./api/routes/orderRoutes')
// Rutas privadas
app.use("/position", private, positionUserRoutes);
app.use("/users", userPrivateRoutes);
app.use("/products", productRoutes)
app.use("/orders", orderRoutes)
// Rutas publicas
app.use("/users", userPublicRoutes);


// Manejando errores HTTP 404 para solicitudes de contenido inexistente
app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});
// Manejo de errores, respuestas con codigo HTTP 500, HTTP 404
app.use(function (err, req, res, next) {
  console.log(err);

  if (err.status === 404) res.status(404).json({ message: "Not found" });
  else res.status(500).json({ message: "Error interno en el servidor!!" });
});

app.listen(port);

console.log("API UP in " + host + ":" + port);
