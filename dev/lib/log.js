const chalk = require('chalk');
module.exports = {
  red:function(...rs) {
    console.log(chalk.red(`${rs}`));
  },
  green: function(...rs) {
    console.log(chalk.green(`${rs}`));
  }
};