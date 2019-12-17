// Karma configuration

module.exports = function(config) {
    config.set({
        basePath: '..',
        frameworks: ['jasmine', 'jasmine-matchers', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-jasmine-matchers'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },

        reporters: ['progress', 'kjhtml'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        restartOnFileChange: false
    })
}
