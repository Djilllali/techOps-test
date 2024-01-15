const processFile = async (file) => {
  try {
    return true;
  } catch (error) {
    console.error("Error processing file:", error);
    throw new Error("File processing error");
  }
};

module.exports = {
  processFile,
};
