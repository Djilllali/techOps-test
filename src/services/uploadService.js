const csvParser = require("csv-parser");
const zippingService = require("./zippingService");

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

  const zipFilePath = await zippingService.zipFile(
    file.originalname,
    maleData,
    femaleData
  );
  return zipFilePath;
};

module.exports = {
  processFile,
};
