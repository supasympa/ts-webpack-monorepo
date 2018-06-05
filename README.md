# Typescript mono-repo

> An experiment using Webpack & Typescript to manage a mono-repo without the need for Lerna.

> If you don't publish any modules or code to a registry for download and reuse, you don't have packages. If you don't have packages, then you don't need Lerna!

## Motivation
To manage a (Typescript) mono-repo that doesn't have independent packages, without lots of manual scripts or using Lerna.

**Tip of the hat: [Lerna JS](https://lernajs.io) profoundly influenced the thinking of this experiment and ironically how to do some of the cool stuff it does, without it!**

## Install and setup
**NOTE: this setup assumes that you work in an isolated environment and currently uses symlinks to link to some node binaries / scripts.**

    npm i
    npm link
    monorepo test
    monorepo build
    npm start
  
Then browse to [https://localhost](https://localhost) 

## How it works

There's nothing too clever. The code relies on a couple of things:

### Typescript path aliases
Seeing as all the (production and test) code is written in Typescript we can use [Typescript path aliases](https://www.typescriptlang.org/docs/handbook/module-resolution.html) to reference any modules within the mono-repo source.
This means no more compiling dependent packages on updates, we simply recompile the parent (source). Modules and their associated path aliases don't have to map one-to-one with components (see below). A module doesn't have to be a component. 

### tsconfig-paths-webpack-plugin
Using Awsome-typescript-loader and tsconfig-paths-webpack-plugin for webpack means, we can use the path aliases, described above. Throughout our workflow.

### The monorepo command.
No more multiple packages and package.json files. There is only one! Which has enormous benefits, if we aren't publishing or redistributing any packages, like consistency for the public packages we depend on within our components and in development.
The disadvantage of one single package.json, however, is that we probably want some granularity of operation against our component code, for example: to run tests specifically for a single component, or build a deployable artifact. 

This is where components, scripts.json and the monorepo command come in.

### Components
Components within our mono-repo are defined as "something that is distributable as an artifact i.e. a website, a lambda function etc."

### Specifying components in the package.json
[Example](./package.json)

As well as defining the paths for shared code / modules (using aliases within the tsconfig.json) we also need to specify the relative path of any component we want to run scripts over, within the codebase.  
We do this in the monorepo/components section of the package.json file.

    "monorepo": {
        "components": {
          "@foo/hello-world-service": "./components/services/hello-world-service",
          "@foo/website": "./components/ui/website",
          "@foo/express-api": "./components/express-api"
        }
      }  

With these things defined we can then use the monorepo command to execute a specified script.

    monorepo mydefinedscript   

This will do one of two things:
    
1. Execute a script, in the local scripts.json file [example scripts.json](./components/services/hello-world-service/scripts.json), much like any package.json and ```npm run <scriptname>```
2. Execute a script in each of the components, if we are at the root, at the same level as the ```package.json```, then the script tries to execute in every component configured in the package.json file.

## Benefits
- No more sym-linking node modules
- No more build orders
- Scoped modules that auto-complete and click-through in Intelli-J, Webstorm, and VS Code
- A single node_modules folder with the same version of packages everywhere.
- A simpler project structure
