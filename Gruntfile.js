/* jshint camelcase: false */
'use strict';

module.exports = function(grunt) {
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  var appConfig = {
    dist: 'dist'
  };

  // Configure Grunt
  grunt.initConfig({
    application: appConfig,

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

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: 'public/index.html',
      options: {
        dest: '<%= application.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= application.dist %>/{,*/}*.html'],
      css: ['<%= application.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= application.dist %>']
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= application.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= application.dist %>'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      main: {
        files: [{
          expand: true,
          cwd: 'config',
          dest: '.tmp',
          src: ['config.js.dist']
        }]
      },
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'public',
          dest: '<%= application.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'views/{,*/}*.html',
            'images/{,*/}*.{webp}',
            'fonts/*'
          ]
        },
        {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= application.dist %>/images',
          src: ['generated/*']
        },
        {
          expand: true,
          cwd: 'public/bower_components/fontawesome/fonts',
          src: ['*.{otf,eot,svg,ttf,woff}'],
          dest: '<%= application.dist %>/bower_components/fontawesome/fonts'
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= application.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    filerev: {
      dist: {
        src: [
          '<%= application.dist %>/scripts/{,*/}*.js',
          '<%= application.dist %>/styles/{,*/}*.css',
          '<%= application.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= application.dist %>/styles/fonts/*'
        ]
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= application.dist %>/{,*/}*',
            '!<%= application.dist %>/.git*'
          ]
        }]
      }
    },

    rename: {
      main: {
        files: [{
          src: ['.tmp/config.js.dist'],
          dest: 'config/config.js'
        }]
      }
    },

    // ngmin tries to make the code safe for minification automatically by
    // using the Angular long form for dependency injection. It doesn't work on
    // things like resolve or inject so those have to be done manually.
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
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
        files: ['Gruntfile.js', 'server.js', 'app/**/*.js', 'config/**/*.js', 'public/**/*.js', '!public/bower_components/**/*.js'],
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
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-contrib-rename');

  grunt.registerTask('default', ['compass', 'jshint', 'concurrent']);
  grunt.registerTask('config', ['copy:main', 'rename:main']);
  grunt.registerTask('build', ['clean', 'useminPrepare', 'compass', 'concat', 'ngmin', 'copy', 'cssmin', 'uglify', 'filerev', 'usemin', 'htmlmin']);
};
