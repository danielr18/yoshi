const yoshiToHaste = require('yoshi-to-haste');
const chalk = require('chalk');

module.exports = () => () => {
  if (process.env.MIGRATE_TO_HASTE === 'false') {
    return;
  }

  const results = yoshiToHaste();

  if (results.length === 0) {
    return;
  }

  console.log('╔════════════════════════════════════════════════════════════════════════╗');
  console.log('║ ' + chalk.red.underline('IMPORTANT!') + '                                                             ║');
  console.log('║                                                                        ║');
  console.log('║ ' + chalk.cyan('🏄🏻  Your project has been auto migrated to use Haste instead of Yoshi') + '   ║');
  console.log('║ ' + chalk.cyan('🏝  You can read about the migration script heuristics here') + '             ║');
  console.log('║ ' + chalk.cyan('🔗  https://github.com/wix-private/yoshi-to-haste') + '                       ║');
  console.log('║                                                                        ║');
  console.log('║ Please remove your ' + chalk.bold.magenta('node_modules ') + 'and run ' + chalk.bold.magenta('npm install') + '                    ║');
  console.log('║                                                                        ║');
  console.log('║ ' + chalk.cyan('🔧  Verify that everything is working') + '                                   ║');
  console.log('║ ' + chalk.cyan('💾  Commit the changes') + '                                                  ║');
  console.log('║ ' + chalk.cyan('🎉  Good luck!') + '                                                          ║');
  console.log('╚════════════════════════════════════════════════════════════════════════╝');

  console.log(chalk.green.underline('The following files has been changed during the migration: '));

  results.forEach(file => {
    console.log(chalk.cyan('» ') + file);
  });

  console.log('');
};
