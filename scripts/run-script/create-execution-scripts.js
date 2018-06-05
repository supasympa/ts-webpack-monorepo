const path = require('path');
const fs = require('fs');
const shell = require('shelljs');

exports.createExecutionScripts = (cwd) => {
    const executeGloballyInAllScriptJson = (scriptName) => {
        const packageJson = packageJsonEnquiries(JSON.parse(fs.readFileSync('./package.json')));

        !!packageJson.hasComponentsConfig() && (() => {
            packageJson.componentNameValues().forEach(componentNameValue => {
                console.log(`${componentNameValue[0]}`)
                moveToDirectory(componentNameValue[1]).andRunScript(scriptName);
                moveToDirectory(cwd);
            })
        })();

        !packageJson.hasComponentsConfig() && (
            console.error(`monorepo config error. Please provide monorepo and components props in package.json `)
        );
    }

    const executeAgainstLocalScriptJson = (scriptName) => {
        const scriptJson = require(path.resolve(cwd, 'scripts.json'));
        const script = `${scriptJson[scriptName]}`;
        console.log(`Executing script: ${script}:[in ${cwd}].`);
        shell.exec(script)
    }

    return {
        executeGloballyInAllScriptJson,
        executeAgainstLocalScriptJson
    }
}

const moveToDirectory = (relativePath) => {
    shell.cd(relativePath);
    return {
        andRunScript: execScript
    }
}

const execScript = (script) => {
    console.log(`${script}`);

    shell.exec(`monorepo ${script}`)
}

const packageJsonEnquiries = (packageJson) => {
    const hasMonoRepoConfig = () => !!packageJson.monorepo;
    const components = () => packageJson.monorepo.components;
    const hasComponentsConfig = () => hasMonoRepoConfig() && !!components();
    const componentNames = () => Object.keys(components());
    const componentNameValues = () => componentNames().map(name => {
        return [name, components()[name]];
    })

    return {
        components,
        componentNames,
        componentNameValues,
        hasMonoRepoConfig,
        hasComponentsConfig
    };
}
