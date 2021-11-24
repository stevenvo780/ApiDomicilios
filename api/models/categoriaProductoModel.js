// Load mongoose module
const mongoose = require("mongoose");
// Define the schemas
const Schema = mongoose.Schema;
// Create schema object with their own necesary fields
const CategoriaProductoSchema = new Schema({
  nombre: {
      type: String,
      trim: true,
      required: true
  }
});

// We export model User for use in other files
module.exports = mongoose.model("Categoria", CategoriaProductoSchema);





