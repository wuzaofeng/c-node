const chalk = require('chalk');
const ip = require('ip').address();
const webpackConfig = require('../webpack/webpack.dist');
const server = require('pushstate-server');
const helper = require('../lib/helper');
const webpack = require('webpack');
const child_process = require('child_process');
const fs = require('fs-extra');
const packageJSON = require('../../package');

helper.loadConfig()
  .then(cfg => {
    if (cfg.theme) {
      helper.syncThemeOnce(cfg.theme);
    }
    const wcfg = webpackConfig(cfg);
    const compiler = webpack(wcfg);
    compiler.run((err, stats) => {
      if (!err) {

        // 写入 version.txt
        const { version, testversion } = packageJSON;
        const out = `V${version}.${testversion}`;
        fs.writeFileSync('dist/version.txt', out);

        // 打包
        child_process.exec('node ./dev/lib/zip.js', function (error, stdout, stderr) {
          console.log(stdout);
        });

        const port = cfg.serverPort;
        server.start({
          port: port,
          directory: wcfg.output.path,
        });
        console.log(chalk.green(`Dist server listening on http://${ip}:${port} ...`));
      }
    });
  })
  .catch(e => {
    console.error(chalk.red(e.message))
  });
