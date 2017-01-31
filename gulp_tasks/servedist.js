( function () {
  'use strict';

  var gulp = require( 'gulp' );
  var browserSync = require( 'browser-sync' );
  var config = require( '../gulp.config' );

  /**
   * serve the dist environment
   */
  module.exports = function ( deps ) {
    gulp.task( 'servedist', deps, function () {
      var options = {
        // notify: false,
        logPrefix: 'RSVP',
        logLevel: 'debug',
        logFileChanges: true,
        server: {
          baseDir: config.dist,
          routes: {
            '/bower_components': './bower_components'
          }
        }
      };

      browserSync( options );
    } );
  };
} )();
