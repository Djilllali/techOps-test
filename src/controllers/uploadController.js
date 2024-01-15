const uploadService = require('../services/uploadService');

const processFile = async (file) => {
  try {
    const result = await uploadService.processFile(file);
    return result;
  } catch (error) {
    console.error("Error processing file:", error);
    throw new Error("File processing error");
  }
};

module.exports = {
  processFile,
};
