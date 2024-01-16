const csvParser = require("csv-parser");
const zippingService = require("./zippingService");

const processFile = async (file, io) => {
  const maleData = [];
  const femaleData = [];

  const fileBuffer = file.buffer;
  io.emit("progress", "{ progress: upload-start }");
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
        // Emit progress event during CSV processing
      })
      .on("end", () => {
        io.emit("progress", "pushing data ends");
        resolve();
      })
      .on("error", (error) => {
        reject(error);
      });
  });
  // Emit event when processing ends
  io.emit("progress", "{ progress: processing-end }");
  // Emit event when zipping starts
  io.emit("progress", "{ progress: zippingstart }");
  const zipFilePath = await zippingService.zipFile(
    file.originalname,
    maleData,
    femaleData
  );
  // Emit event when zipping ends
  io.emit("progress", "{ progress: zipping-end }");
  io.emit("progress", "{ progress: complete }");
  return zipFilePath;
};

module.exports = {
  processFile,
};
