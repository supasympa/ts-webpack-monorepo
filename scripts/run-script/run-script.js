#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const {createExecutionScripts} = require('./create-execution-scripts');
const {executeGloballyInAllScriptJson, executeAgainstLocalScriptJson} = createExecutionScripts(process.cwd());

const scriptExecutor = (scriptName) => {
    exitOnNoScript(scriptName)

    !!packageJsonFoundInCwd() && executeGloballyInAllScriptJson(scriptName);
    !!scriptsJsonFoundInCwd() && executeAgainstLocalScriptJson(scriptName);
    !packageJsonFoundInCwd() && !scriptsJsonFoundInCwd() &&
        console.error(`No script.json or package.json found in current working directory (${process.cwd()})`);
};

const packageJsonFoundInCwd = () => fs.existsSync(path.resolve(process.cwd(), 'package.json'));
const scriptsJsonFoundInCwd = () => fs.existsSync(path.resolve(process.cwd(), 'scripts.json'));

const exitOnNoScript = (scriptName) => {
    !scriptName && (() => {
        console.log(`No script to run provided. Provide a script as the first argument.`)
        process.exit(1);
    })()
}

scriptExecutor(process.argv[2]);
