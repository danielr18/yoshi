#!/bin/bash
git clean -Xdf -e "!.idea" -e "!*.iml" -e "!*.private.*"
nvm install
npm config set registry https://registry.npmjs.org/
npm install
npm run build
npm test
