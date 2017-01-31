( function () {
  'use strict';

  var gulp = require( 'gulp' );
  var args = require( 'yargs' ).argv;
  var config = require( '../gulp.config' );
  var utils = require( '../gulp.utils' );
  var $ = require( 'gulp-load-plugins' )( {
    lazy: true
  } );

  // .pipe( $.sass( {
  //   precision: 10,
  //   onError: console.error.bind( console, 'Sass error:' )
  // } ) )

  /**
   * Compile less to css
   * @return {Stream}
   */
  module.exports = function ( deps ) {
    gulp.task( 'styles', deps, function () {
      utils.log( 'Compiling Less --> CSS' );

      var autoprefixerOptions = {
        browser: [ 'last 2 version', '> 5%' ]
      };

      var sizeOptions = {
        title: 'styles'
      };

      return gulp
        .src( config.less )
        .pipe( $.if( args.verbose, $.print() ) )
        .pipe( $.plumber() )
        .pipe( $.less() )
        .pipe( $.autoprefixer( autoprefixerOptions ) )
        .pipe( gulp.dest( config.temp ) )
        .pipe( $.size( sizeOptions ) );
    } );
  };
} )();
