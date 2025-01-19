const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    if (file.isFile()) {
      const filePath = path.join(folderPath, file.name);

      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error('Error retrieving file stats:', err);
          return;
        }
        const fileName = file.name;
        const fileExt = file.name.slice(
          file.name.indexOf('.')+1,
          file.name.length,
        );
        const fileSize = Math.round(stats.size / 1024) + 'kb';

        console.log(`${fileName} - ${fileExt} - ${fileSize}`);
      });
    }
  });
});
