const yaml = require('js-yaml');
const fs = require('fs');
module.exports = function (file) {
  try {
    const doc = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
    return doc;
  } catch (e) {
    console.log(e);
  }
};