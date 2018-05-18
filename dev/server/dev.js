const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const chalk = require('chalk');
const path = require('path');
const ip = require('ip').address();
const webpackCfg = require('../webpack/webpack.dev');
const helper = require('../lib/helper');
const watchThemeDirectory = require('../lib/sync_files');

helper.loadConfig()
  .then(cfg => {
    const { port, host } = { port: cfg.serverPort, host: ip };

    try {
      if (cfg.theme) {
        helper.syncThemeOnce(cfg.theme);
        watchThemeDirectory(path.resolve(`src/theme/${cfg.theme}`), helper.defaultThemeHome);
      }

      const compiler = webpack(webpackCfg(cfg));
      const server = new WebpackDevServer(compiler, {
        contentBase: path.resolve(__dirname, '../../'),
        compress: true,
        historyApiFallback: true,
        hot: true,
        stats: {
          colors: true,
          assets: false,
          source: false,
          timings: true,
          hash: false,
          version: false,
          chunkModules: false,
          chunkOrigins: false,
        },
      });

      server.listen(port, host, () => {
        const url = `http://${host}:${port}`;
        console.log(chalk.green(`Dev server listening on ${url} ...`));
      });
    } catch (e) {
      console.log(chalk.red(`The following error has ocurred: ${e}`));
    }

  }).catch(e => {
  console.error(chalk.red(e.message))
});

