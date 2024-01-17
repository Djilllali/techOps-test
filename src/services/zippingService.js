/**
 * Module de service pour la compression de données.
 * @module zippingService
 */
const archiver = require("archiver");
const fs = require("fs");
/**
 * Fonction asynchrone pour créer un fichier ZIP à partir de données maleData et femaleData.
 * @async
 * @function createZipFile
 * @param {string} filename - Nom du fichier d'origine.
 * @param {string} maleData - Données masculines au format CSV.
 * @param {string} femaleData - Données féminines au format CSV.
 * @throws {Error} Lance une erreur si la création du fichier ZIP échoue.
 * @returns {Promise} Renvoie le chemin du fichier ZIP créé.
 * @description Cette fonction crée un fichier ZIP à partir des données CSV masculines et féminines,
 * en utilisant la bibliothèque archiver, puis renvoie le chemin du fichier ZIP créé.
 */

const createZipFile = async (filename, maleData, femaleData) => {
  const timestamp = Date.now();
  const zipFilePath = `./uploads/${filename.split(".")[0]}_${timestamp}.zip`;

  const output = fs.createWriteStream(zipFilePath);
  const archive = archiver("zip", {
    zlib: { level: 1 },
  });

  archive.pipe(output);

  // Converting compressed data to Buffer
  const maleBuffer = Buffer.from(maleData, "utf-8");
  const femaleBuffer = Buffer.from(femaleData, "utf-8");

  // Add maleData.csv to the ZIP
  archive.append(maleBuffer, { name: "maleData.csv" });

  // Add femaleData.csv to the ZIP
  archive.append(femaleBuffer, { name: "femaleData.csv" });

  const path = zipFilePath.replace(".", "");
  // handling finalization
  return new Promise((resolve, reject) => {
    output.on("close", () => {
      resolve(path);
    });

    archive.on("error", (err) => {
      console.error("Error during archiving:", err);
      reject(err);
    });

    archive.finalize();
  });
};

module.exports = {
  createZipFile,
};
