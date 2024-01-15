const fs = require("fs");

const createZipFile = async (
  filename,
  compressedMaleData,
  compressedFemaleData
) => {
  const timestamp = Date.now();
  const zipFilePath = `./uploads/${filename.split(".")[0]}_${timestamp}.zip`;

  const maleBuffer = Buffer.from(compressedMaleData);
  const femaleBuffer = Buffer.from(compressedFemaleData);

  const zipData = Buffer.concat([maleBuffer, femaleBuffer]);

  // Write the compressed data to the ZIP file
  fs.writeFileSync(zipFilePath, zipData);

  return zipFilePath;
};

module.exports = {
  createZipFile,
};
