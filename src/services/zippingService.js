const pako = require("pako");
const { createZipFile } = require("../utils/fileUtils");

const zipFile = async (filename, maleData, femaleData) => {
  // Compressing data with pako
  const compressedMaleData = pako.deflate(JSON.stringify(maleData), {
    to: "string",
  });
  const compressedFemaleData = pako.deflate(JSON.stringify(femaleData), {
    to: "string",
  });

  // Create a zip file
  const zipFilePath = await createZipFile(
    filename,
    compressedMaleData,
    compressedFemaleData
  );

  return zipFilePath;
};

module.exports = {
  zipFile,
};
