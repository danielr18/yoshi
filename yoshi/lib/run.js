'use strict';

const {isString} = require('lodash');
const {watchMode, logIfAny, inTeamCity} = require('./utils');
const {log, logIf, logIfP} = require('./log');
const {base, statics} = require('./globs');
const projectConfig = require('../config/project');

const watch = watchMode();

module.exports = (plugins, options) => {
  return plugins.reduce((promise, parallel) => {
    return promise.then(() => {
      return Promise.all(parallel.map(task => {
        const taskFn = isString(task) ? require(task) : task;
        return taskFn({log, logIf, logIfP, watch, base, statics, inTeamCity, projectConfig})(options)
          .catch(error => {
            logIfAny(error);
            if (!watch) {
              process.exit(1);
            }
          });
      }));
    });
  }, Promise.resolve());
};
