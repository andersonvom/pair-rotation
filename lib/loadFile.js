const fs = require('fs');

function loadFile(filename, defaultContent) {
  try {
    return JSON.parse(fs.readFileSync(filename, 'utf8'));
  } catch (e) {
    return defaultContent
  }
}

module.exports = loadFile
