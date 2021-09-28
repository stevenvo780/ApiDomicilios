var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PositionUserSchema = new Schema({
  position: {
    type: String,
    required: "Se requiere un nombre",
  },
  usuario: {
    type: String,
    required: "Se requiere un usuario",
  },
});

module.exports = mongoose.model("PositionUser", PositionUserSchema);
