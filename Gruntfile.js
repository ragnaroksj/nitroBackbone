/*!
 * Gruntfile.js for Bootstrap & Wordpress "Example Grunt Project"
 * Version 1.0.0
 * Author: Duri Chitayat
 */

module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  RegExp.quote = function (string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  var fs = require('fs');
  var path = require('path');
  //var generateGlyphiconsData = require('./grunt/bs-glyphicons-data-generator.js');
  var BsLessdocParser = require('./grunt/bs-lessdoc-parser.js');
  var generateRawFilesJs = require('./grunt/bs-raw-files-generator.js');
  var updateShrinkwrap = require('./grunt/shrinkwrap.js');


  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * Bootstrap v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2011-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */\n',

//** Removed check for Jquery **//

    // Task configuration.
    
    /*Javascript Optimization by Require*/
    requirejs : {
      compileJs : {
        options : {
          baseUrl : "./wp-content/themes/nitro/js/app",
          name : 'main',
          out : './wp-content/themes/nitro/js/app/min.js',
          paths : {
          },
          include : [
            "router",
            "pages/default",
            "pages/homepage",
            "pages/sample",
            "pages/styleguide"
          ],
          mainConfigFile : './wp-content/themes/nitro/js/app/main.js',
          wrap : {
            start : "(function() {",
            end : "}());"
          },
          fileExclusionRegExp : /^(r|build)\.js$/
        }
      },
      compileCss : {
        options : {
          baseUrl : "./wp-content/themes/nitro/css",
          cssIn : "wp-content/themes/nitro/css/_app.css",
          out : "./wp-content/themes/nitro/css/min.css",
          optimizeCss : "standard"
        }
      }
    },

    qunit : {
      all : ['./test/*.html']
    },

    /*less*/
    less : {
      compile : {
        options : {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: 'app.css.map',
          sourceMapFilename: 'wp-content/themes/nitro/css/app.css.map'
        },
        files : {
          "wp-content/themes/nitro/css/_app.css" : "wp-content/themes/nitro/css/_app.less"
        }
      }
    },
    /*live less watch*/
    watch : {
      less : {
        files : ['wp-content/themes/nitro/css/**/*.less'], // which files to watch
        tasks : ['less']
      },
      qunit : {
         files : ['test/*.js', 'test/*.html'], // which files to watch
          tasks : ['qunit']
      }
    },
    csslint: {
      options: {
        csslintrc: 'less/.csslintrc'
      },
      src: [
        'wp-content/themes/nitro/css/_app.css'
      ]
    },

    sed: {
      versionNumber: {
        pattern: (function () {
          var old = grunt.option('oldver');
          return old ? RegExp.quote(old) : old;
        })(),
        replacement: grunt.option('newver'),
        recursive: true
      }
    },

    exec: {
      npmUpdate: {
        command: 'npm update'
      },
      npmShrinkWrap: {
        command: 'npm shrinkwrap --dev'
      }
    }

  });


  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-qunit');


  // Docs HTML validation task
  // grunt.registerTask('validate-html', ['jekyll', 'validation']);

  // Test task.
  var testSubtasks = [];
  // Skip core tests if running a different subset of the test suite
  // if (!process.env.TWBS_TEST || process.env.TWBS_TEST === 'core') {
  //   testSubtasks = testSubtasks.concat(['dist-css', 'csslint', 'jshint', 'jscs', 'qunit'/*, 'build-customizer-html'*/]);
  // }
  
  // Skip HTML validation if running a different subset of the test suite
    // if (!process.env.TWBS_TEST || process.env.TWBS_TEST === 'validate-html') {
    // testSubtasks.push('validate-html');
  // }
  
  // Only run Sauce Labs tests if there's a Sauce access key
  if (typeof process.env.SAUCE_ACCESS_KEY !== 'undefined' &&
      // Skip Sauce if running a different subset of the test suite
      (!process.env.TWBS_TEST || process.env.TWBS_TEST === 'sauce-js-unit')) {
    testSubtasks.push('connect');
    testSubtasks.push('saucelabs-qunit');
  }

  
  
  /*development task*/
  grunt.registerTask('lessmap',['less']);
  grunt.registerTask('dev',['lessmap','watch:less']);

  /*QA*/
  grunt.registerTask('qa', ['watch:qunit']);  


  /*product task*/
  grunt.registerTask('exp',['less', 'requirejs']);

  // Default task.
  grunt.registerTask('default', [ 'exp', 'dev']);
  

  // Version numbering task.
  // grunt change-version-number --oldver=A.B.C --newver=X.Y.Z
  // This can be overzealous, so its changes should always be manually reviewed!
  //grunt.registerTask('change-version-number', 'sed');

  //grunt.registerTask('build-glyphicons-data', generateGlyphiconsData);

  // Task for updating the npm packages used by the Travis build.
  grunt.registerTask('update-shrinkwrap', ['exec:npmUpdate', 'exec:npmShrinkWrap', '_update-shrinkwrap']);
  grunt.registerTask('_update-shrinkwrap', function () { updateShrinkwrap.call(this, grunt); });
};