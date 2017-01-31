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
   * Create $templateCache from the site html templates
   * @return {Stream}
   */
  module.exports = function ( deps ) {
    gulp.task( 'templatecache-site', deps, function () {
      utils.log( 'Creating an AngularJS $templateCache for site' );

      var templateCache = config.site.templateCache;
      var options = {
        empty: true
      };

      return gulp
        .src( config.site.html )
        .pipe( $.if( args.verbose, $.print() ) )
        .pipe( $.if( args.verbose, $.bytediff.start() ) )
        .pipe( $.minifyHtml( options ) )
        .pipe( $.if( args.verbose, $.bytediff.stop( utils.BytediffFormatter ) ) )
        .pipe( $.angularTemplatecache( templateCache.file, templateCache.options ) )
        .pipe( gulp.dest( config.temp ) );
    } );
  };
} )();
