const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Example Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Steven",
        url: "https://www.linkedin.com/in/steven-vallejo-ortiz-430213155/",
        email: "stevenvallejo@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
  },
};

// Configuracion de swaggerUi
const options = {
  swaggerDefinition,
  // Lectura de todas las rutas
  apis: ["./api/routes/*.js"],
};

const specs = swaggerJSDoc(options);

module.exports = specs;
