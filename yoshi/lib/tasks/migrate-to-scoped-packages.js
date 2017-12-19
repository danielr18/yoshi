'use strict';

const {inTeamCity} = require('../utils');

module.exports = () => () => {

  if (!packageExists('update-scopes')) {
    return Promise.resolve();
  }

  if (inTeamCity()) {
    console.log('Migration of scoped dependencies skipped, cause running inside CI');
    return Promise.resolve();
  }

  const path = require('path');
  const {update} = require('update-scopes');

  const packageJson = path.join(process.cwd(), 'package.json');

  return update(packageJson).catch(() => {});
};

function packageExists(name) {
  try {
    require(name);
    return true;
  } catch (error) {
    return false;
  }
}
