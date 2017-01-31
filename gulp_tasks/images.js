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
   * Compress and copy images
   * @return {Stream}
   */
  module.exports = function ( deps ) {
    gulp.task( 'images', deps, function () {
      utils.log( 'Compressing and copying images' );

      var imageMinOptions = {
        optimizationLevel: 4,
        progressive: true,
        interlaced: true
      };

      var sizeOptions = {
        title: 'images'
      };

      return gulp
        .src( config.images )
        .pipe( $.if( args.verbose, $.print() ) )
        .pipe( $.cache( $.imagemin( imageMinOptions ) ) )
        .pipe( gulp.dest( config.dist + 'assets/img' ) )
        .pipe( $.size( sizeOptions ) );
    } );
  };
} )();
