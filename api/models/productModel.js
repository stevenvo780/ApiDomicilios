// Load mongoose module
const mongoose = require("mongoose");
// Define the schemas
const Schema = mongoose.Schema;
// Create schema object with their own necesary fields
const ProductSchema = new Schema({
    nombre: {
    type: String,
    trim: true,
    required: true,
  },
  descripcion: {
    type: String,
    trim: true,
    required: true,
  },
  caracteristicas: {
    type: String,
    trim: true,
    required: true,
  },
  empresa: {
    type: String,
    trim: true,
    required: true,
  },
  valorCU: {
    type: String,
    trim: true,
    required: true,
  },
});

// We export model User for use in other files
module.exports = mongoose.model("Product", ProductSchema);