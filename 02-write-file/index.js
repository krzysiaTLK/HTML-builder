const fs = require('fs');
const { stdout, stdin } = process;

stdout.write('Hi! Enter your important info:\n');
const output = fs.createWriteStream('./02-write-file/text.txt');
stdin.on('data', (chunk) => {
  const input = chunk.toString().trim();

  if (input.toLowerCase() === 'exit') {
    process.exit();
  }
  output.write(chunk);
});

process.on('SIGINT', () => process.exit());
process.on('exit', () => stdout.write('Bye-bye!'));
// process.exit()
