import chalk = require('chalk');

let npmExecPath: string =  process.env.npm_execpath;

console.log(chalk.green('Gauge Web Steps successfully installed.'))
if (npmExecPath.indexOf('yarn') >= 0 ) {
  console.log(chalk.red('Gauge Web Steps was installed using yarn. Please run yarn-fix-bin to fix binaries'));
}
