let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;
chai.use(chaiHttp);
const url = "http://localhost:3006";

describe("Consultar restaurantes", () => {
  it("Enpoint restaurantes", (done) => {
    chai
      .request(url)
      .post("/restaurantes")
      .send({
        ciudad: "Tijuana",
      })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("Registro y edicion de usuarios ", async () => {
  await it("Registrar un usuario", (done) => {
    chai
      .request(url)
      .post("/users/register")
      .send({
        nombre: "steven",
        apellido: "steven",
        fechaNacimiento: "2020-01-01",
        tipoDocumento: "steven",
        documentoIdentidad: "steven",
        password: "Htmlnod32",
      })
      .end(function (err, res) {
        userId = res.body.data._id;
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("Editar usuario ", () => {
  it("Editar usuario", (done) => {
    chai
      .request(url)
      .post("/users/register")
      .send({
        nombre: "steven",
        apellido: "steven",
        fechaNacimiento: "2020-01-01",
        tipoDocumento: "steven",
        documentoIdentidad: "steven",
        password: "Htmlnod32",
      })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        chai
          .request(url)
          .put("/users/update/" + res.body.data._id)
          .send({
            nombre: "steven edit",
            apellido: "vallejo ortiz edit",
            fechaNacimiento: "2020-01-01",
            tipoDocumento: "steven edit",
            documentoIdentidad: "steven edit",
            password: "Htmlnod32",
          })
          .end(function (err, response) {
            expect(response).to.have.status(200);
            done();
          });
      });
  });
});

describe("Authenticacion ", () => {
  it("Consultando autenticacion", (done) => {
    chai
      .request(url)
      .post("/users/authenticate")
      .send({
        documentoIdentidad: "steven",
        password: "Htmlnod32",
      })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("Historial de busquedas ", () => {
  it("Validando endpoint", (done) => {
    chai
      .request(url)
      .get("/restaurantes")
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
});
