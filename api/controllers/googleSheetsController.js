// Cargamos el modelo recien creado
const userModel = require("../models/userModel");

const { GoogleSpreadsheet } = require("google-spreadsheet");

// Controladores relacionados a los usuarios y la autenticacion
module.exports = {
  getByUser: async function (req, res, next) {
    userModel.findOne({ _id: req.params.id }, function (err, user) {
      if (err) {
        next(err);
      } else {
        //console.log("This is your user", user);
        const SheetsByUser = async () => {
          const getSpreadSheet = async () => {
            const doc = new GoogleSpreadsheet(
              user.googleSheets.spreadsheet.spreadsheet_id
            );
            try {
              await doc.useServiceAccountAuth({
                client_email: user.googleSheets.connection.client_email,
                private_key: user.googleSheets.connection.private_key.replace(
                  /\\n/g,
                  "\n"
                ),
              });

              // Load document properties and worksheets
              await doc.loadInfo();

              const sheet =
                doc.sheetsById[user.googleSheets.spreadsheet.sheet_id];
              const rows = await sheet.getRows();
              console.log(`Sheets by user ${user.nombre}`, rows);
              return res.json({
                status: "200",
                message: "Sheets List Found!!!",
                data: { userSheets: rows },
              });
            } catch (e) {
              console.error("Error", e);
            }
          };
        };
        SheetsByUser();
      }
    });
  },
};
