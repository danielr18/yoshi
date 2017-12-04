'use strict';

const gulp = require('gulp');
const path = require('path');
const Jasmine = require('jasmine');
const {TerminalReporter, TeamCityReporter} = require('jasmine-reporters');
const projectConfig = require('../../config/project');
const globs = require('../globs');
const {inTeamCity} = require('../utils');

const files = projectConfig.specs.node() || globs.specs();
require('../require-hooks'); // TODO: remove once jasmine is spawned in a child process

const clearRequireCache = () => {
  Object.keys(require.cache)
    .filter(key => !key.includes('node_modules'))
    .forEach(key => delete require.cache[key]);
};

function runJasmine() {
  return new Promise((resolve, reject) => {
    process.env.NODE_ENV = 'test';
    process.env.SRC_PATH = './src';

    const jasm = new Jasmine();
    jasm.addReporter(new TerminalReporter({color: true, verbosity: 2}));

    if (inTeamCity()) {
      jasm.addReporter(new TeamCityReporter());
    }

    jasm.onComplete(passed => passed ? resolve() : reject());
    jasm.loadConfig({
      spec_dir: '', //eslint-disable-line camelcase
      spec_files: [ //eslint-disable-line camelcase
        files
      ],
      helpers: [
        path.join(__dirname, '..', '..', 'config', 'test-setup.js')
      ]
    });

    clearRequireCache();
    jasm.execute();
  });
}

module.exports = ({log, watch}) => {
  function jasmine() {
    if (watch) {
      gulp.watch(`${globs.base()}/**/*`, runJasmine);
    }

    return runJasmine();
  }

  return log(jasmine);
};
