'use strict';

module.exports = function(grunt) {
  // Configure Grunt
  grunt.initConfig({
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        jshintrc: '.jshintrc',
        force: true
      },

      all: ['Gruntfile.js', 'server.js', 'app/**/*.js', 'config/**/*.js', 'public/**/*.js', '!public/bower_components/**/*.js']
    },

    wiredep: {
      target: {
        src: ['public/index.html'],
        dependencies: true,
      }
    },

    compass: {
      options: {
        sassDir: 'public/styles',
        cssDir: '.tmp/styles'
      },
      dev: {
        options: {
          debugInfo: true
        }
      }
    },

    jasmine_node: {
      options: {
        forceExit: true
      },
      all: ['tests/node/spec/']
    },

    karma: {
      unit: {
        configFile: 'tests/client/karma.conf.js'
      }
    },

    watch: {
      scripts: {
        files: ['server.js', 'app/**/*.js', 'config/**/*.js', 'public/**/*.js', '!public/bower_components/**/*.js'],
        tasks: ['jshint']
      },
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      styles: {
        files:['public/styles/{,*/}*.{scss,sass}'],
        tasks:['compass']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'watch']
    }
  });

  // Load Grunt plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['compass', 'jshint', 'concurrent']);
};
