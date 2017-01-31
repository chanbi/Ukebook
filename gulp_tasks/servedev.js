( function () {
  'use strict';

  var gulp = require( 'gulp' );
  var browserSync = require( 'browser-sync' );
  var config = require( '../gulp.config' );
  var utils = require( '../gulp.utils' );

  /**
   * serve the dev environment
   */
  module.exports = function ( deps ) {
    gulp.task( 'servedev', deps, function () {
      var options = {
        // notify: false,
        logPrefix: 'RSVP',
        logLevel: 'debug',
        logFileChanges: true,
        server: {
          baseDir: [ config.temp, config.src ],
          routes: {
            '/bower_components': './bower_components'
          }
        }
      };

      browserSync( options );

      gulp.watch( [ config.site.index, config.admin.index ], browserSync.reload )
        .on( 'change', function ( event ) {
          utils.logFileChangeEvent( event );
        } );

      gulp.watch( [ config.site.css, config.admin.css ], browserSync.reload )
        .on( 'change', function ( event ) {
          utils.logFileChangeEvent( event );
        } );

      gulp.watch( config.less, [ 'styles', browserSync.reload ] )
        .on( 'change', function ( event ) {
          utils.logFileChangeEvent( event );
        } );

      gulp.watch( [ config.site.js, config.admin.js ], [ 'vet' ] )
        .on( 'change', function ( event ) {
          utils.logFileChangeEvent( event );
        } );

      gulp.watch( config.images, browserSync.reload )
        .on( 'change', function ( event ) {
          utils.logFileChangeEvent( event );
        } );
    } );
  };
} )();
