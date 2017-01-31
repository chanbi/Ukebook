( function () {
  'use strict';

  var gulp = require( 'gulp' );
  var config = require( '../gulp.config' );
  var utils = require( '../gulp.utils' );
  var $ = require( 'gulp-load-plugins' )( {
    lazy: true
  } );

  /**
   * Optimize all site files, move to a build folder,
   * and inject them into the new site index.html
   * @return {Stream}
   */
  module.exports = function ( deps ) {
    gulp.task( 'optimize-site', deps, function () {
      utils.log( 'Optimizing the js, css, and html for site' );

      var templateCache = config.temp + config.site.templateCache.file;

      var options = {
        title: 'optimize-site'
      };

      return gulp
        .src( config.site.index )
        .pipe( $.plumber() )
        .pipe( utils.inject( templateCache, 'templates' ) )
        .pipe( $.useref() )
        .pipe( $.if( '*.css', $.csso() ) )
        .pipe( $.if( '*.js', $.uglify() ) )
        .pipe( $.if( '*.css', $.rev() ) )
        .pipe( $.if( '*.js', $.rev() ) )
        .pipe( $.revReplace() )
        .pipe( gulp.dest( config.dist ) )
        .pipe( $.rev.manifest() )
        .pipe( gulp.dest( config.dist ) )
        .pipe( $.size( options ) );
    } );
  };
} )();
