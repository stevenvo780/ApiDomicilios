// Load mongoose module
const mongoose = require("mongoose");
// Define the schemas
const Schema = mongoose.Schema;
// Create schema object with their own necesary fields
const OrderSchema = new Schema(
  {
    orderNumber: {
      type: String,
      trim: true,
      required: true,
    },
    fecha: {
      type: Date,
      trim: true,
      required: true,
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
    pedido: {
      type: String,
      trim: true,
      required: true,
    },
    direccion: {
      type: Object,
      trim: true,
      required: true,
    },
    estado: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

// We export model User for use in other files
module.exports = mongoose.model("Order", OrderSchema);
