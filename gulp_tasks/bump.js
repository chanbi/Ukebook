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
   * Bump the version
   * --type=pre will bump the prerelease version *.*.*-x
   * --type=patch or no flag will bump the patch version *.*.x
   * --type=minor will bump the minor version *.x.*
   * --type=major will bump the major version x.*.*
   * --version=1.2.3 will bump to a specific version and ignore other flags
   * @return {Stream}
   */
  module.exports = function ( deps ) {
    gulp.task( 'bump', deps, function () {
      var msg = 'Bumping versions';

      var type = args.type;
      var version = args.version;
      var options = {};

      if ( version ) {
        options.version = version;
        msg += ' to ' + version;
      } else {
        options.type = type;
        msg += ' for a ' + type;
      }

      utils.log( msg );

      return gulp
        .src( config.packages )
        .pipe( $.print() )
        .pipe( $.bump( options ) )
        .pipe( gulp.dest( config.root ) );
    } );
  };
} )();
