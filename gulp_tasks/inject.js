( function () {
  'use strict';

  var gulp = require( 'gulp' );
  var config = require( '../gulp.config' );
  var utils = require( '../gulp.utils' );

  /**
   * Wire-up the custom site dependencies
   * @return {Stream}
   */
  module.exports = function ( deps ) {
    gulp.task( 'inject-site', deps, function () {
      utils.log( 'Wire up css into the site index.html, after files are ready' );

      return gulp
        .src( config.site.index )
        .pipe( utils.inject( config.site.css ) )
        .pipe( utils.inject( config.site.js ) )
        .pipe( gulp.dest( config.src ) );
    } );
  };
} )();
