'use strict';

module.exports = function(grunt) {
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration
  grunt.initConfig({
    // Metadata
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
      '<%= pkg.author.name %>;' +
      ' Licensed <%= pkg.license %> */\n',
    // Task configuration
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      target: ['lib/*.js', 'test/*.js']
    },
    mocha: {
      test: {
        src: ['test/*.html'],
        options: {
          run: true,
          log: true,
          reporter: 'Spec'
        }
      }
    },
    clean: ['dist'],
    transpile: {
      amd: {
        type: "amd",
        files: [{
          expand: true,
          cwd: 'lib/',
          src: ['**/*.js'],
          dest: 'dist/',
          ext: '.amd.js'
        }]
      },
      globals: {
        type: "globals",
        files: [{
          expand: true,
          cwd: 'lib/',
          src: ['**/*.js'],
          dest: 'dist/',
        }]
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: 'dist/stylesheet.js',
        dest: 'dist/stylesheet.min.js'
      }
    },
    compress: {
      main: {
        options: {
          mode: 'gzip'
        },
        expand: true,
        cwd: 'dist/',
        src: ['*.min.js'],
        dest: 'dist/'
      }
    }
  });

  // Test
  grunt.registerTask('test', [
    'mocha'
  ]);

  // Build dist
  grunt.registerTask('build', [
    'clean',
    'transpile:globals',
    'transpile:amd',
    'uglify',
    'compress'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);
};
