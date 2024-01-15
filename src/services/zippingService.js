const pako = require("pako");

const zipFile = async (filename, maleData, femaleData) => {
  // Compressing each gender's data using pako
  const compressedMaleData = pako.deflate(JSON.stringify(maleData));
  const compressedFemaleData = pako.deflate(JSON.stringify(femaleData));

  return compressedFemaleData;
};

module.exports = {
  zipFile,
};
