// src/services/uploadService.js
const csvParser = require("csv-parser");

const processFile = async (file) => {
  const maleData = [];
  const femaleData = [];

  const fileBuffer = file.buffer;

  await new Promise((resolve, reject) => {
    // Creating a readable stream from the buffer
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
      })
      .on("end", () => {
        resolve();
      })
      .on("error", (error) => {
        reject(error);
      });
  });

  return femaleData;
};

module.exports = {
  processFile,
};
