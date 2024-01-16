const archiver = require("archiver");
const fs = require("fs");
const createZipFile = async (filename, maleData, femaleData) => {
  const timestamp = Date.now();
  const zipFilePath = `./uploads/${filename.split(".")[0]}_${timestamp}.zip`;

  const output = fs.createWriteStream(zipFilePath);
  const archive = archiver("zip", {
    zlib: { level: 9 }, // Maximum compression
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
