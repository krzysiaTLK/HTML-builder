const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'files-copy');

fs.mkdir(folderPath, { recursive: true }, (err) => {
  if (err) {
    return console.error(`Error creating folder: ${err}`);
  }
});

const origFolderPath = path.join(__dirname, 'files');
fs.readdir(origFolderPath, { withFileTypes: true }, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    if (file.isFile()) {
      const origFilePath = path.join(origFolderPath, file.name);
      const filePath = path.join(folderPath, file.name);

      fs.copyFile(origFilePath, filePath, () => {});
    }
  });
});
