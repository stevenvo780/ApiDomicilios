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
  variedades: {
    type: String,
    trim: true,
    required: false,
  },
  precio: {
    type: Object,
    trim: true,
    required: true,
  },
  ocultar: {
    type: String,
    trim: true,
    required: false,
  },
  categoria: {
    type: Object,
    trim: true,
    required: true,
  },
  imagen: {
    type: Object,
    trim: true,
    required: true,
  },
  user: {
    type: Object,
    trim: true,
    required: true,
  },
});

// We export model User for use in other files
module.exports = mongoose.model("Product", ProductSchema);
