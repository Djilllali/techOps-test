/**
 * Module de service pour la manipulation de fichiers CSV.
 * @module csvService
 */
const csvWriter = require("csv-writer").createObjectCsvWriter;
const csvParser = require("csv-parser");
const zippingService = require("./zippingService");
const fs = require("fs");

/**
 * Fonction asynchrone pour analyser un fichier CSV et le convertir en fichier ZIP.
 * @async
 * @function parseFile
 * @param {Object} file - Objet représentant le fichier CSV.
 * @throws {Error} Lance une erreur si l'analyse du fichier échoue.
 * @returns {Promise} Renvoie le chemin du fichier ZIP résultant.
 * @description Cette fonction prend un fichier CSV, le divise en données maleData et femaleData,
 * convertit ces données en chaînes CSV distinctes, crée un fichier ZIP et renvoie le chemin du fichier ZIP créé.
 */
const parseFile = async (file) => {
  const maleData = [];
  const femaleData = [];
  let processedRows = 0;
  const fileBuffer = file.buffer;
  await new Promise((resolve, reject) => {
    const readableStream = require("stream").Readable.from(fileBuffer);

    readableStream
      .pipe(csvParser())
      .on("data", (row) => {
        const gender = row.gender.toLowerCase();
        if (gender === "male") {
          maleData.push(row);
        } else if (gender === "female") {
          femaleData.push(row);
        }
        processedRows++;
      })
      .on("end", () => {
        resolve();
      })
      .on("error", (error) => {
        console.log("error");
        reject(error);
      });
  });

  const maleCsvString = await convertArrayToCsvString(maleData);
  const femaleCsvString = await convertArrayToCsvString(femaleData);

  const zipFilePath = await zippingService.createZipFile(
    file.originalname,
    maleCsvString,
    femaleCsvString
  );

  return zipFilePath;
};
/**
 * Fonction asynchrone pour convertir un tableau de données en CSV.
 * @async
 * @function convertArrayToCsvString
 * @param {Array} dataArray - Tableau de données à convertir.
 * @returns {Promise} Renvoie le CSV résultant.
 * @description Cette fonction prend un tableau de données et le convertit en un CSV,
 * en utilisant la bibliothèque csv-writer.
 */
async function convertArrayToCsvString(dataArray) {
  const csvWriterInstance = csvWriter({
    path: "temp.csv", // Use a temporary file
    header: Object.keys(dataArray[0]),
  });

  await csvWriterInstance.writeRecords(dataArray);
  const csvString = fs.readFileSync("temp.csv", "utf-8");

  // Removing the temporary file
  fs.unlinkSync("temp.csv");

  return csvString;
}

module.exports = {
  parseFile,
};
