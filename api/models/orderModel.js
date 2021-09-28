// Load mongoose module
const mongoose = require("mongoose");
// Define the schemas
const Schema = mongoose.Schema;
// Create schema object with their own necesary fields
const OrderSchema = new Schema({
  fecha: {
    type: Date,
    trim: true,
    //required: true,
  },
  cliente: {
    type: Object,
    trim: true,
    required: true,
  },
  domiciliario: {
    type: Object,
    trim: true,
    required: true,
  },
  productos: {
    type: [Object],
    trim: true,
    required: true,
  },
  direccion: {
    type: String,
    trim: true,
    required: true,
  },
});

// We export model User for use in other files
module.exports = mongoose.model("Order", OrderSchema);