# lab-bamboo-reporter
Bamboo reporter for Hapi's [Lab](https://github.com/hapijs/lab) test runner

Inspired by https://github.com/issacg/mocha-bamboo-reporter


## Usage
If `lab` is installed globally:

    lab -r ./node_modules/lab-bamboo-reporter [-o outputfilename.ext]

The above relative path to `node_modules` is so a globally-installed `lab` knows to look in your local install. Otherwise, you can run using the local install of lab:

    ./node_modules/.bin/lab -r lab-bamboo-reporter [-o outputfilename.ext]


## Integrating mocha & bamboo with mocha-bamboo-reporter

Download and install the Node.js Bamboo Plugin from the Atlassian Marketplace from inside your Bamboo installation.

Then, in your `package.json` file, add a devDependency for "lab-bamboo-reporter", and a script "bamboo" as outlined below...

    package.json
    
    ...
    "devDependencies": {
        ...
        "lab": "^5.0.0",
        "lab-bamboo-reporter": "^1.1.0"
    }
    
    "scripts": {
        ...
        "bamboo": "./node_modules/.bin/lab -r lab-bamboo-reporter -o bamboo.json"
    }
    
* In Bamboo, create an "npm task" with command `run-script bamboo`
* Then, in Bamboo add a "Parse lab results" task which runs afterwards to parse the results from `lab`
* If you don't do a full checkout on each build, make sure you add a task to delete bamboo.json BEFORE the `npm run-script bamboo` task (a simple script task that runs `rm -f bamboo.json` should do the trick)
