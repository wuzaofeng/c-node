const admZip = require('bestzip');
const fs = require('fs-extra');
const path = require('path');
const log = require('./log');
const packageJSON = require('../../package');

const dist = 'dist';
const release = 'release';

fs.removeSync(release);
fs.mkdir(release);

const { version, testversion } = packageJSON;

const out = `${release}/V${version}.${testversion}.zip`;

function exit(msg) {
  log.red(msg);
  process.exit(0);
}

if (testversion === undefined) exit(`package.json 缺少 testversion 字段`);
if (isNaN(parseInt(testversion))) exit(`package.json 内的 testversion 字段不能为非数字`);

if(!fs.existsSync(dist)) exit(`${path.resolve(dist)} 目录不存在！`);

admZip(out, [dist], function (err) {
  if (err) {
    console.error(err.stack);
    process.exit(0);
  } else {
    log.green(`Release to ${path.resolve(out)} success`);
  }
});

