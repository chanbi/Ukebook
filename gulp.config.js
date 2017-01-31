( function () {
  'use strict';

  module.exports = ( function () {
    var rootDir = './';
    var srcDir = rootDir + 'src/';
    var assetsDir = srcDir + 'assets/';
    var siteDir = srcDir + 'site/';
    var adminDir = srcDir + 'admin/';
    var modulesDir = srcDir + 'modules/';
    var tempDir = rootDir + '.tmp/';
    var distDir = rootDir + 'dist/';

    var config = {
      /**
       * File paths
       */
      root: rootDir,
      temp: tempDir,
      src: srcDir,
      dist: distDir,
      alljs: [
        srcDir + '**/*.js',
        rootDir + '*.js',
        '!' + assetsDir + 'js/**/*.js'
      ],
      images: assetsDir + 'img/**/*',
      fonts: assetsDir + 'fonts/**/*',
      less: assetsDir + 'styles/*.less',
      site: {
        dir: siteDir,
        index: srcDir + 'index.html',
        js: [
          modulesDir + '**/*.module.js',
          modulesDir + '**/*.js',
          siteDir + '**/*.module.js',
          siteDir + '**/*.js',
          '!' + siteDir + '**/*.spec.js'
        ],
        css: assetsDir + 'css/site.css',
        html: siteDir + '**/*.html',

        /**
         * template cache
         */
        templateCache: {
          file: 'site.templates.js',
          options: {
            module: 'rsvpSite',
            root: 'site/',
            standAlone: false
          }
        }
      },
      admin: {
        dir: adminDir,
        index: adminDir + 'index.html',
        js: [
          modulesDir + '**/*.module.js',
          modulesDir + '**/*.js',
          adminDir + '**/*.module.js',
          adminDir + '**/*.js',
          '!' + adminDir + '**/*.spec.js'
        ],
        css: [
          assetsDir + 'css/admin.css', assetsDir + 'css/admin.animate.css'
        ],
        html: adminDir + '**/*.html',

        /**
         * template cache
         */
        templateCache: {
          file: 'admin.templates.js',
          options: {
            module: 'rsvpAdmin',
            root: 'admin/',
            standAlone: false
          }
        }
      },

      /**
       * Bower and NPM files
       */
      bower: {
        json: require( rootDir + 'bower.json' ),
        dir: rootDir + 'bower_components/'
      },
      packages: [
        rootDir + 'package.json',
        rootDir + 'bower.json'
      ],
    };

    return config;
  } )();
} )();
