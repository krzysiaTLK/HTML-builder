const { error } = require('console');
const fs = require('fs');
const path = require('path');

const newFolderPath = path.join(__dirname, 'project-dist');

fs.mkdir(newFolderPath, { recursive: true }, (err) => {
  if (err) {
    return console.error(`Error creating folder: ${err}`);
  }
});

const componentsFolderPath = path.join(__dirname, 'components');
const templateFilePath = path.join(__dirname, 'template.html');
const indexFilePath = path.join(newFolderPath, 'index.html');

fs.readFile(templateFilePath, 'utf-8', (err, templateData) => {
  if (err) throw err;

  fs.readdir(componentsFolderPath, { withFileTypes: true }, (err, files) => {
    if (err) throw err;

    let modifiedTemplate = templateData;
    files.forEach((file) => {
      if (file.isFile() && path.extname(file.name) === '.html') {
        const componentName = path.basename(file.name, '.html');
        const componentPath = path.join(componentsFolderPath, file.name);

        const componentData = fs.readFile(componentPath, 'utf-8', () => {});

        const placeholder = `{{${componentName}}}`;
        modifiedTemplate = modifiedTemplate.replace(placeholder, componentData);
      }
    });

    fs.writeFile(indexFilePath, modifiedTemplate, (err) => {
      if (err) throw err;
    });
  });
});

const stylesFolderPath = path.join(__dirname, 'project-dist');
const stylesOrigFolderPath = path.join(__dirname, 'styles');

fs.readdir(stylesOrigFolderPath, { withFileTypes: true }, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    if (
      file.name.slice(file.name.indexOf('.') + 1, file.name.length) === 'css'
    ) {
      const stylesFilePath = path.join(stylesFolderPath, 'style.css');

      const readingStream = fs.createReadStream(
        `./06-build-page/styles/${file.name}`,
        'utf-8',
      );

      readingStream.on('data', (chunk) =>
        fs.appendFileSync(stylesFilePath, chunk),
      );
    }
  });
});

const assetsOrigFolderPath = path.join(__dirname, 'assets');
const assetsFolderPath = path.join(__dirname, 'project-dist', 'assets');

function copyFolder(src, dest) {
  fs.mkdir(dest, { recursive: true }, (err) => {
    if (err) {
      console.error(`Error creating folder ${dest}:`, err);
      return;
    }

    fs.readdir(src, { withFileTypes: true }, (err, entries) => {
      if (err) {
        console.error(`Error reading directory ${src}:`, err);
        return;
      }

      entries.forEach((entry) => {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
          copyFolder(srcPath, destPath);
        } else if (entry.isFile()) {
          fs.copyFile(srcPath, destPath, (err) => {
            if (err) {
              console.error(
                `Error copying file ${srcPath} to ${destPath}:`,
                err,
              );
            }
          });
        }
      });
    });
  });
}
copyFolder(assetsOrigFolderPath, assetsFolderPath);
