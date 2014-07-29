module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    basePath: '../../public',
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'scripts/**/*.js',
      '../tests/client/spec/**/*.js'
    ],
    port: 8080,
    browsers: ['PhantomJS'],
    plugins: ['karma-phantomjs-launcher', 'karma-jasmine'],
    singleRun: true,
    colors: true
  });
};
