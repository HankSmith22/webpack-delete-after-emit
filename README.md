# webpack-delete-after-emit
Deletes globs after webpack is done emitting files. Used for cleaning up post-webpack for deployments.

# Installation

Install via NPM.

    npm i -D webpack-delete-after-emit

# Usage
Add to plugins section of webpack.

    new WebpackDeleteAfterEmit({
        globs:[('*.js')]
    }),

# Options

* `globs` Array of file globs ( https://www.npmjs.com/package/glob ).
* `Verbose` Verbose output.
* `doStats` Outputs a stats file.
* `statsPath` Relative to the webpack output folder, the stats file path. Only used if doStats is set to true.
* `dryRun` If true will not delete files.
