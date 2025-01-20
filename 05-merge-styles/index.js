const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'project-dist');
const origFolderPath = path.join(__dirname, 'styles');

fs.readdir(origFolderPath, { withFileTypes: true }, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    const stylesData = [];
    if (
      file.name.slice(file.name.indexOf('.') + 1, file.name.length) === 'css'
    ) {
      const origFilePath = path.join(origFolderPath, file.name);
      const filePath = path.join(folderPath, 'bundle.css');

      const readingStream = fs.createReadStream(
        `./05-merge-styles/styles/${file.name}`,
        'utf-8',
      );
      const writingStream = fs.createWriteStream(
        './05-merge-styles/project-dist/bundle.css',
      );

      readingStream.on('data', (chunk) => fs.appendFileSync(filePath, chunk));
    }
  });
});
