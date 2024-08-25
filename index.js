import express from "express";
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const app = express()



app.listen(8000, () => console.log("Apps is listenng at 8000"))



app.get('/', (req, res) => {

  const dateObject = new Date();

  const year = dateObject.getFullYear();
  const month = (`0 ${dateObject.getMonth() + 1}`).slice(-2);
  const date = (`0 ${dateObject.getDate()}`).slice(-2);
  // current hours
  const hours = dateObject.getHours();

  // current minutes
  const minutes = dateObject.getMinutes();

  // current seconds
  const seconds = dateObject.getSeconds();
  // log

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const FOLDER_PATH = path.join(__dirname, 'timestamps');

  if (!fs.existsSync(FOLDER_PATH)) {
    fs.mkdirSync(FOLDER_PATH, { recursive: true });
  }

  const timestamp = `Date: ${year}-${month}-${date} Time:${hours}-${minutes}-${seconds}`;
  const filename = `D${year}-${month}-${date}T${hours}-${minutes}-${seconds}.txt`;
  const filepath = path.join(FOLDER_PATH, filename);

  fs.writeFile(filepath, timestamp, (err) => {
    if (err) {
      return res.status(500).json({ message: `Error creating file`, error: err });
    }

    // After creating the file, list all text files in the folder
    fs.readdir(FOLDER_PATH, (err, files) => {
      if (err) {
        return res.status(500).json({ message: 'Error reading directory', error: err });
      }

      // Filter only .txt files
      const txtFiles = files.filter(file => path.extname(file) === '.txt');
      res.json({ message: 'File created successfully', filename, files: txtFiles, postmanDocumentation: "https://documenter.getpostman.com/view/24751227/2sAXjF9Ev1" });
    });
  });




  // res.send(`Date: ${year}-${month}-${date} Time: ${hours}:${minutes}:${seconds}`)
});



// console.log(`Date: ${year}-${month}-${date} Time: ${hours}:${minutes}:${seconds}`);