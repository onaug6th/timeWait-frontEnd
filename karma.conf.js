// Karma configuration
// Generated on Fri Aug 04 2017 20:53:38 GMT+0800 (CST)

module.exports = function(config) {
  let configuration = {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', '@angular/cli'],




    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'kjhtml'],
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },

    // web server port
    port: 9876,
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],

    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless'],

    customLaunchers: {
      Chrome_travis_ci: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox"]
      }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: process.env.TRAVIS,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  }
  config.set(configuration)
}
