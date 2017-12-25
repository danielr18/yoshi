'use strict';

const path = require('path');
const update = require('update-scopes').update;

module.exports = () => () => {

  if (insideCi()) {
    console.log('Running inside CI: Migration of scoped dependencies skipped.');
    return Promise.resolve();
  }

  const packageJson = path.join(process.cwd(), 'package.json');
  return update(packageJson).catch(() => {});

};

function insideCi() {
  return process.env.BUILD_NUMBER || process.env.TEAMCITY_VERSION || process.env.CI;
}
