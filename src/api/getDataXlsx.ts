// import * as gapi from "gapi";

// export function getValues(spreadsheetId, range, callback) {
//   try {
//     gapi.client.sheets.spreadsheets.values
//       .get({
//         spreadsheetId: spreadsheetId,
//         range: range,
//       })
//       .then((response) => {
//         const result = response.result;
//         const numRows = result.values ? result.values.length : 0;
//         console.log(`${numRows} rows retrieved.`);
//         if (callback) callback(response);
//       });
//   } catch (err) {
//     console.error(err);
//     return;
//   }
// }
