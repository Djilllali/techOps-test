/**
 * Module de service pour l'envoi de fichiers.
 * @module uploadService
 */

const uploadService = require("../services/uploadService");

/**
 * Fonction asynchrone pour traiter un fichier csv.
 * @async
 * @function processFile
 * @param {Object} file - Objet représentant le fichier csv.
 * @throws {Error} Lance une erreur si le traitement du fichier échoue.
 * @returns {Promise} Renvoie le résultat du traitement du fichier.
 * @description Cette fonction utilise le service d'upload pour analyser le fichier spécifié.
 */
const processFile = async (file) => {
  try {
    const result = await uploadService.parseFile(file);
    return result;
  } catch (error) {
    console.error("Error processing file:", error);
    throw new Error("File processing error");
  }
};

module.exports = {
  processFile,
};
