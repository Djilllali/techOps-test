const csvWriter = require("csv-writer").createObjectCsvWriter;
const csvParser = require("csv-parser");
const zippingService = require("./zippingService");
const fs = require("fs");

const processFile = async (file) => {
  const maleData = [];
  const femaleData = [];
  let processedRows = 0;
  const fileBuffer = file.buffer;
  await new Promise((resolve, reject) => {
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
        processedRows++;
      })
      .on("end", () => {
        resolve();
      })
      .on("error", (error) => {
        console.log("error");
        reject(error);
      });
  });

  const maleCsvString = await convertArrayToCsvString(maleData);
  const femaleCsvString = await convertArrayToCsvString(femaleData);

  const zipFilePath = await zippingService.createZipFile(
    file.originalname,
    maleCsvString,
    femaleCsvString
  );

  return zipFilePath;
};

async function convertArrayToCsvString(dataArray) {
  const csvWriterInstance = csvWriter({
    path: "temp.csv", // Use a temporary file
    header: Object.keys(dataArray[0]),
  });

  await csvWriterInstance.writeRecords(dataArray);
  const csvString = fs.readFileSync("temp.csv", "utf-8");

  // Removing the temporary file
  fs.unlinkSync("temp.csv");

  return csvString;
}

module.exports = {
  processFile,
};
