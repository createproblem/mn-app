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
      main: {
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
        assetsDirs: ['<%= application.dist %>', '<%= application.dist %>/images']
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

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'public/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= application.dist %>/images'
        },
        {
          expand: true,
          cwd: 'public/static',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= application.dist %>/static'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dev: {
        files: [{
          expand: true,
          cwd: 'config',
          dest: '.tmp',
          src: ['config.env.json.dist']
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
          cwd: '.tmp/static',
          dest: '<%= application.dist %>/static',
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
      dev: {
        files: [{
          src: ['.tmp/config.env.json.dist'],
          dest: 'config/config.env.json'
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

    env: {
      dev: {
        src: 'config/config.env.json'
      },
      dist: {
        src: 'config/config.env.json',
        add: {
          NODE_ENV: 'production'
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
        script: 'server.js',
        options: {
          ignore: ['node_modules/**', 'public/**'],
          watch: ['app/**/*.js']
        }
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      dev: ['nodemon', 'watch'],
      dist: ['compass', 'imagemin']
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
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-env');

  grunt.registerTask('default', ['env:dev', 'compass', 'jshint', 'concurrent:dev']);
  grunt.registerTask('config', ['copy:dev', 'rename:dev']);
  grunt.registerTask('build', ['clean', 'useminPrepare', 'concurrent:dist', 'concat', 'ngmin', 'copy:dist', 'cssmin', 'uglify', 'filerev', 'usemin', 'htmlmin']);
  grunt.registerTask('dist', ['env:dist', 'nodemon']);
};
