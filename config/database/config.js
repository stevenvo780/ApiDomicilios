//Cargando el modulo de mongoose
const mongoose = require("mongoose");
//Configurando la conexion para MongoDB, Debemos indicar el puerto y la IP de nuestra BD
const mongoDB = process.env.MONGODB__URL
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
module.exports = mongoose;
