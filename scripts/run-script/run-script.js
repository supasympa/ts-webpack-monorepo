#!/usr/bin/env node
const path = require('path');
const shell = require('shelljs');
const scriptJsonPath = path.resolve(process.cwd(), 'scripts.json');
const scriptJson = require(scriptJsonPath);
if(!process.argv[2]){
  console.log('no script provided.')
  process.exit(1);
}
console.log(__dirname)
const scriptName = path.resolve(__dirname,`../../`) + `/node_modules/.bin/${scriptJson[process.argv[2]]}`;
console.log(`trying to execute script ${scriptName}`);

shell.exec(scriptName)

