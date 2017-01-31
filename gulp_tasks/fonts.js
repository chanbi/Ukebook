( function () {
  'use strict';

  var gulp = require( 'gulp' );
  var args = require( 'yargs' ).argv;
  var config = require( '../gulp.config' );
  var utils = require( '../gulp.utils' );
  var $ = require( 'gulp-load-plugins' )( {
    lazy: true
  } );

  /**
   * Copy fonts
   * @return {Stream}
   */
  module.exports = function ( deps ) {
    gulp.task( 'fonts', deps, function () {
      utils.log( 'Copying fonts' );

      var options = {
        title: 'fonts'
      };

      return gulp
        .src( config.fonts )
        .pipe( $.if( args.verbose, $.print() ) )
        .pipe( gulp.dest( config.dist + 'assets/fonts' ) )
        .pipe( $.size( options ) );
    } );
  };
} )();
