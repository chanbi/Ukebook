( function () {
  'use strict';

  var gulp = require( 'gulp' );
  var args = require( 'yargs' ).argv;
  var browserSync = require( 'browser-sync' );
  var config = require( '../gulp.config' );
  var utils = require( '../gulp.utils' );
  var $ = require( 'gulp-load-plugins' )( {
    lazy: true
  } );

  /**
   * vet the code and create coverage report
   * @return {Stream}
   */
  module.exports = function ( deps ) {
    gulp.task( 'vet', deps, function () {
      utils.log( 'Analyzing source with JSHint and JSCS' );

      var jshintReporterOptions = {
        verbose: true
      };

      var bsReloadOptions = {
        stream: true,
        once: true
      };

      return gulp
        .src( config.alljs )
        .pipe( browserSync.reload( bsReloadOptions ) )
        .pipe( $.if( args.verbose, $.print() ) )
        .pipe( $.jscs() )
        .pipe( $.jshint() )
        .pipe( $.jshint.reporter( 'jshint-stylish' ), jshintReporterOptions )
        .pipe( $.if( !browserSync.active, $.jshint.reporter( 'fail' ) ) );
    } );
  };
} )();
