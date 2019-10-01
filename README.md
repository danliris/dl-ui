# Danliris Code Coverage

### dl-ui [![Build Status](https://travis-ci.org/danliris/dl-ui.svg?branch=migration)](https://travis-ci.org/danliris/dl-ui)
### com-danliris-service-purchasing [![codecov](https://codecov.io/gh/danliris/com-danliris-service-purchasing/branch/dev/graph/badge.svg)](https://codecov.io/gh/danliris/com-danliris-service-purchasing) [![Build Status](https://travis-ci.org/danliris/com-danliris-service-purchasing.svg?branch=dev)](https://travis-ci.org/danliris/com-danliris-service-purchasing)
### com-danliris-service-finance-accounting [![codecov](https://codecov.io/gh/danliris/com-danliris-service-finance-accounting/branch/dev/graph/badge.svg)](https://codecov.io/gh/danliris/com-danliris-service-finance-accounting) [![Build Status](https://travis-ci.com/danliris/com-danliris-service-finance-accounting.svg?branch=dev)](https://travis-ci.com/danliris/com-danliris-service-finance-accounting)
### com.danliris.service.core [![codecov](https://codecov.io/gh/danliris/com.danliris.service.core/branch/dev/graph/badge.svg)](https://codecov.io/gh/danliris/com.danliris.service.core) [![Build Status](https://travis-ci.com/danliris/com.danliris.service.core.svg?branch=dev)](https://travis-ci.com/danliris/com.danliris.service.core)
### com-danliris-service-sales [![codecov](https://codecov.io/gh/danliris/com-danliris-service-sales/branch/dev/graph/badge.svg)](https://codecov.io/gh/danliris/com-danliris-service-sales) [![Build Status](https://travis-ci.com/danliris/com-danliris-service-sales.svg?branch=dev)](https://travis-ci.com/danliris/com-danliris-service-sales)
### com-danliris-service-finishing-printing [![codecov](https://codecov.io/gh/danliris/com-danliris-service-finishing-printing/branch/dev/graph/badge.svg)](https://codecov.io/gh/danliris/com-danliris-service-finishing-printing) [![Build Status](https://travis-ci.com/danliris/com-danliris-service-finishing-printing.svg?branch=dev)](https://travis-ci.com/danliris/com-danliris-service-finishing-printing)
### com.danliris.service.inventory [![codecov](https://codecov.io/gh/danliris/com.danliris.service.inventory/branch/dev/graph/badge.svg)](https://codecov.io/gh/danliris/com.danliris.service.inventory) [![Build Status](https://travis-ci.org/danliris/com.danliris.service.inventory.svg?branch=dev)](https://travis-ci.org/danliris/com.danliris.service.inventory)
### com-danliris-service-auth [![codecov](https://codecov.io/gh/danliris/com-danliris-service-auth/branch/dev/graph/badge.svg)](https://codecov.io/gh/danliris/com-danliris-service-auth) [![Build Status](https://travis-ci.com/danliris/com-danliris-service-auth.svg?branch=dev)](https://travis-ci.com/danliris/com-danliris-service-auth)
### com-danliris-service-weaving [![Build Status](https://dev.azure.com/moonlay-danliris/DMS.Weaving/_apis/build/status/Weaving%20CI-CD%20Auto%20Deploy%20to%20Dev?branchName=dev)](https://dev.azure.com/moonlay-danliris/DMS.Weaving/_build/latest?definitionId=9&branchName=dev)
### com-danliris-service-spinning [![Build Status](https://dev.azure.com/moonlay-danliris/DMS.Spinning/_apis/build/status/DMS.Spinning-ASP.NET-CI?branchName=dev)](https://dev.azure.com/moonlay-danliris/DMS.Spinning/_build/latest?definitionId=5&branchName=dev)
### com-danliris-service-merchandiser [![Build Status](https://travis-ci.com/danliris/com-danliris-service-merchandiser.svg?branch=dev)](https://travis-ci.com/danliris/com-danliris-service-merchandiser)
### com-danliris-service-deal-tracking [![Build Status](https://travis-ci.org/danliris/com-danliris-service-deal-tracking.svg?branch=dev)](https://travis-ci.org/danliris/com-danliris-service-deal-tracking)
### com.danliris.service.support [![Build Status](https://travis-ci.org/danliris/com.danliris.service.support.svg?branch=dev)](https://travis-ci.org/danliris/com.danliris.service.support)


# aurelia-skeleton-webpack

## Getting started

Before you start, make sure you have a recent version of [NodeJS](http://nodejs.org/) environment *>=4.0* with NPM 3.

From the project folder, execute the following commands:

```shell
npm install
```

This will install all required dependencies, including a local version of Webpack that is going to
build and bundle the app. There is no need to install Webpack globally. 

To run the app execute the following command:

```shell
npm start
```

This command starts the webpack development server that serves the build bundles.
You can now browse the skeleton app at http://localhost:9000. Changes in the code
will automatically build and reload the app.

## Feature configuration

Most of the configuration will happen in the `webpack.config.js` file.
There, you may configure advanced loader features or add direct SASS or LESS loading support.

## Bundling

To build a development bundle (output to /dist) execute:

```shell
npm run build
```

To build an optimized, minified production bundle (output to /dist) execute:

```shell
npm run build:prod
```

To test either the development or production build execute:

```shell
npm run server:prod
```

The production bundle includes all files that are required for deployment.

## Resource and bundling configuration

You may want to separate out parts of your code to other files.
This can be done by specifying a build resource object inside `package.json`. 

For example, if you wanted to lazy-load the /users path of the skeleton you could define it as follows:

```js
// (package.json)
"aurelia": {
  "build": {
    "resources": [
      {
        "path": "users",
        "bundle": "users",
        "lazy": true
      }
    ]
  }
},
```

The "path" field can be either a string or an array of strings. 
The string should be a path, relative to the src or in case of an external resource, as a require path (e.g. `aurelia-plugin/some-resource.html`).
`.js`, `.ts` and `.html` extensions are optional and will be resolved automatically.
The bundle setting is recursive, therefore any files required by the specified path will also be contained by the bundle, unless they are also contained by another one (iteration is done from first to last resource).

Resources must also be specified in case Aurelia is supposed to load an external file or an external module that was not defined as a resource by any of the dependencies.
Since the syntax is still relatively new, most Aurelia plugins don't define their resources. 
There might also be reasons not to declare those resources, in case the plugin is to be consumed only partially.
If you'd like to use external resources, you should declare them yourself, like so:

```js
// (package.json)
"aurelia": {
  "build": {
    "resources": [
      "aurelia-some-ui-plugin/dropdown",
      "aurelia-some-ui-plugin/checkbox"
    ]
  }
},
```

You can also combine both features to separate out plugins or resources for lazy-loading:

```js
// (package.json)
"aurelia": {
  "build": {
    "resources": [
      {
        "path": "aurelia-animator-css",
        "bundle": "animator",
        "lazy": true
      },
      {
        "path": [
          // lets say we only use the checkbox from within subpage1
          // we want those to be bundled together in a bundle called: "subpage1"
          "aurelia-some-ui-plugin/checkbox",
          "./items/subpage1"
        ],
        "bundle": "subpage1",
        "lazy": true
      },
      "aurelia-some-ui-plugin/dropdown"
    ]
  }
},
```

Please see https://github.com/aurelia/webpack-plugin for more information.

## Running The Unit Tests

To run the unit tests:

```shell
npm test
```

## Running The E2E Tests
Integration tests are performed with [Protractor](http://angular.github.io/protractor/#/).

1. Place your E2E-Tests into the folder ```test/e2e/src```

2. Run the tests by invoking

  ```shell
  npm run e2e
  ```

### Running e2e tests manually

1. Make sure your app runs and is accessible

  ```shell
  WEBPACK_PORT=19876 npm start
  ```

3. Once bundle is ready, run the E2E-Tests in another console

  ```shell
  npm run e2e:start
  ```

## Electron (coming soon)

To add Electron support to the skeleton, first run:

```shell
npm run electron:setup
```

Once the packages are installed, you may either view your app in Electron or build application packages for production:

```shell
# developing on Electron with live-reload
npm run electron:start

# creates packages for the current operating system
npm run electron:package

# creates packages for all operating systems
npm run electron:package:all
```

The entry-file for Electron can be found in `config/electron.entry.development.ts`.

Building or creating the Electron package will create a file `electron.js` in the root directory of the skeleton.

### Loading native packages in Electron

If you have packages that cannot work in the Electron Renderer process (e.g. native packages), or wish to use the package in the renderer process as if it is running under Node, list them under `externals`, in the file `config/webpack.electron.js`.

## Acknowledgments

Parts of code responsible for Webpack configuration were inspired by or copied from @AngularClass' [angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter).

Parts of code responsible for Webpack-Electron configuration and packaging were inspired by or copied from @chentsulin's [electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate).
