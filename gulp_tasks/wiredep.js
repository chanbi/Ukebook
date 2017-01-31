( function () {
  'use strict';

  var gulp = require( 'gulp' );
  var config = require( '../gulp.config' );
  var utils = require( '../gulp.utils' );
  var wiredep = require( 'wiredep' ).stream;
  var $ = require( 'gulp-load-plugins' )( {
    lazy: true
  } );

  /**
   * Wire-up the site bower dependencies
   * @return {Stream}
   */
  module.exports = function ( deps ) {
    gulp.task( 'wiredep-site', deps, function () {
      utils.log( 'Wiring the bower dependencies into the site index.html' );

      var options = {
        bowerJson: config.bower.json,
        directory: config.bower.dir,
        exclude: [
          'angular-xeditable',
          'angular-animate',
          'angular-route',
          'angular-smart-table',
          'jquery',
          'bootstrap.js',
          'ng-csv',
          'lr-sticky-header',
          'respond',
          'html5shiv'
        ]
      };

      return gulp
        .src( config.site.index )
        .pipe( wiredep( options ) )
        .pipe( gulp.dest( config.src ) );
    } );
  };
} )();
