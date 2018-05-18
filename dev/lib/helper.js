const detect = require('detect-port');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');
const ip = require('ip').address();
const cfgLoader = require('./config_loader');

function portDetected(port) {
  return new Promise((resolve, reject) => {
    detect(port, (err, _port) => {
      if (err) reject(err);
      if (port === _port) {
        resolve(port);
      } else {
        console.log(chalk.yellow(`Port: ${port} was occupied, try port: ${_port}`));
        resolve(_port);
      }
    });
  });
}

function loadConfig() {
  const cfg = cfgLoader('dev/bootstrap.yml');
  if (cfg) {
    return portDetected(cfg.serverPort).then((port) => {
      cfg.serverPort = port;
      return cfg;
    })
  }
  return Promise.reject('配置加载失败');
}


const defaultThemeHome = path.resolve('src/theme/_default');

// 复制同步主题到_default目录
function syncThemeOnce(theme) {
  fs.removeSync(defaultThemeHome);
  fs.copySync(path.resolve(`src/theme/${theme}`), defaultThemeHome);
}

function createEntry(cfg, prefix = null) {
  return cfg.reduce((prev, curr) => {
    prev[curr.name] = prefix ? [...prefix, curr.entry] : curr.entry;
    return prev;
  }, {});
}

function createDistEntry(cfg) {
  return createEntry(cfg.html, ['babel-polyfill']);
}

// 生成开发模式的entry
function createDevModeEntry(cfg) {
  return createEntry(cfg.html, [
    'babel-polyfill',
    `webpack-dev-server/client?http://${ip}:${cfg.serverPort}/`,
    'webpack/hot/only-dev-server'
  ])
}

module.exports = {
  createDistEntry,
  createDevModeEntry,
  loadConfig,
  syncThemeOnce,
  defaultThemeHome,
};