const { GoogleSpreadsheet } = require("google-spreadsheet");

// Config variables
const SPREADSHEET_ID = "17Qff4xLke1pLc1_2dvkpq0mQzvJKu0-EVjRWJjcbDZ8";
const SHEET_ID = "0";
const SHEET_ID_SECOND = "84902843";
const CLIENT_EMAIL = "google-sheets@api-maps-325921.iam.gserviceaccount.com";
const PRIVATE_KEY =
  "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC2pf4oMzV4PVco\nqOZex7wVHh8Er6EqDduq71OMfJkuwih9nJrAXk/9aIUvMJo3nCRyjOvZTuS4d56F\nHxOsxCVlSzrfjHNC3BudqUnVoS7qcR49zMRXoNe2ZSQ9hhIru2RWFhPx4N+Ja68F\nfd/vFSDjDAQKOOPP2rlqh0fNdjHDymj1R973thQfUuavJSPU+/djETP6wsQJHDqB\n9ifZ+tsUa78iAAhjZRT1NYmcqr7Hvf/rG6zDKoAk3R+ElaRwpoqPhN4G+NlkBtqo\nEQK1ltfvwlOhmjB127rL9LbhRaQ/D9+fEYa+GCaF7zGNerDs2x1QTsfcDo2A/5px\nu1m+lCYBAgMBAAECggEACPNk23wkSv/ZN/E3AOlm394PBRVvn3ZNuo2/RBY4Z4s0\n8sWW69seA7wjMrx+AkBQ+kV1ABGWsdeNhCvmtJkUKrz0u08luDQTLQxxGtqq8urs\n4XhvHXWQvKvY38752vzJnlJh/dYtqOKxvAzUHuJOhJyVIhnG8uu0GcgGuRyUCb/a\nBlt3Rfbf4/UdRY/3w/BU8wytZKKInOET/86pIupPuKwMQUxWQY0TFM5zk0d0iM/w\nLzuq4xo3uPwLvq51szpD5j674sub5ud6swgCnTrHIRL+gFsDx4K1qdppcntkJnhB\nK/fWhv4ZxvCWFbHYZ0jVevFGarMoEHq0zbBVmzl7xQKBgQDnR5VGY/IHKuEiczn8\noLdmwP+y1ZmN3gEbhYo9pcraazU86CiumC5KT7/HK2JWcosJJeXjevH0pZ2UqypB\n63ycMqIpfFq6fEbNOgueViRpHbx9EzhJm/c5NM6klGmFlZBY7PkiBfTdUphzhIF/\nMh/RIG81GLbB2KJw981QpvvbJwKBgQDKK7tyVeZIuUXoeXYxfn8AOO9TtmW3xP8L\n5DeM3xNIdDKwPmrLp4Ei+Uxi8hBwmeyN4r2uYp92tA+UMnBFFEWAHFLYjfPb6JHu\nrKSFMamdx/FpxzNeBye2w855NqkOLGARzCIGfV5XprqkjwzZG9oVjP5P/sKtlUdM\nkfAcasBOlwKBgGHvxh6QpCS027Ei6iM4S3GPuLeaC/QvVni5C9kfI89qJpksFk4Y\n00FUk/lbPcEtsAKnsbmqjlry5s/Vy4cumQ3rww+eQS1HAxRUyCa8g56foPm18df5\n26611euLjUOsGfwOHVFzBEXUfAouykd6ik6cVXs+g+WCPwdnZ+IHVA9xAoGABNMe\nWhAqurmRLYcYhv3Z0guJypmju8r7uzDrEnWQZD5Bp2sV6V5J+qewZvwX4FgMCSbM\nGAlKfO63IHZDr6JYNkJ2x6w7kZfvQ57jHjqdLaLD5B5Y33mUPQxXNRVU2327nTEd\n7sG3KqhT8/FmARhlD/aZaxdNVg8l8HHbJRJ3HGkCgYEAiks9L2WcrRgodrhTal0/\n+3lc/e6JZv31KWVZx29+i+MmPIwd/CY2xtS+h2orLqsOj1qOWNdJDmt2x7oIpPyT\nJCY97fLpxU99fkD+jCyF7X5blQ0uIJbGB/6+gnXXeSTOqQCVq+SYGhbKxBYjBnw+\nsOiFw2c954zkI2KEpNsOyAo=\n-----END PRIVATE KEY-----\n";

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
