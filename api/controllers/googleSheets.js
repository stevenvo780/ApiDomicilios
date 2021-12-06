const { GoogleSpreadsheet } = require("google-spreadsheet");

// Config variables
const SPREADSHEET_ID = "17Qff4xLke1pLc1_2dvkpq0mQzvJKu0-EVjRWJjcbDZ8";
const SHEET_ID = "0";
const SHEET_ID_SECOND = "84902843";
const CLIENT_EMAIL = "google-sheets@api-maps-325921.iam.gserviceaccount.com";
const PRIVATE_KEY =
  "***CLAVE-PRIVADA-RETIRADA-2026-09-24***\n";

const PRIVATE_KEY_DONE = PRIVATE_KEY.replace(/\\n/g, "\n");

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

const getSpreadSheet = async (row) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY_DONE,
    });
    // loads document properties and worksheets
    await doc.loadInfo();
	
    const sheet = doc.sheetsById[SHEET_ID_SECOND];
    const rows = await sheet.getRows();
    //console.log("SHEET: ", sheet);
    console.log('ROWS', rows);

  } catch (e) {
    console.error("Error: ", e);
  }
};

getSpreadSheet();
