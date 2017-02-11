( function () {
  'use strict';

  var config = require( './gulp.config' );
  var gulp = require( 'gulp' );
  var pagespeed = require( 'psi' );
  var utils = require( './gulp.utils' );
  var $ = require( 'gulp-load-plugins' )( {
    lazy: true
  } );

  // gulp-uncss
  // gulp-replace
  // gulp-sourcemaps

  gulp.task( 'help', $.taskListing );
  gulp.task( 'default', [ 'help' ] );

  utils.task( 'vet' );
  utils.task( 'bump' );

  utils.task( 'styles', [ 'clean-styles' ] );
  utils.task( 'fonts', [ 'clean-fonts' ] );
  utils.task( 'images', [ 'clean-images' ] );

  utils.task( 'check-favicon-update');
  utils.task( 'generate-favicon', [ 'clean-favicon' ]);
  utils.task( 'inject-favicon');

  utils.task( 'wiredep' );
  utils.task( 'templatecache', [ 'clean-code' ] );
  utils.task( 'inject', [ 'wiredep', 'styles' ] );
  utils.task( 'optimize', [ 'inject', 'templatecache' ] );

  gulp.task( 'dist', [ 'images', 'fonts', 'optimize' ] );

  utils.task( 'servedev', [ 'inject' ] );
  utils.task( 'servedist' ); // clean , [ 'dist' ]

  gulp.task( 'test', [ 'vet', 'templatecache' ], function ( done ) {
  } );

  gulp.task( 'less-watcher', function () {
    gulp.watch( [ config.less ], [ 'styles' ] );
  } );

  gulp.task( 'clean-styles', function () {
    return utils.clean( config.temp + '**/*.css' );
  } );

  gulp.task( 'clean-fonts', function () {
    return utils.clean( config.dist + 'assets/fonts/**/*' );
  } );

  gulp.task( 'clean-images', function () {
    return utils.clean( config.dist + 'assets/img/**/*' );
  } );

  gulp.task( 'clean-favicon', function () {
    return utils.clean( config.dist + 'assets/img/favicon/**/*' );
  } );

  gulp.task( 'clean-code', function () {
    var files = [].concat(
      config.temp + config.site.templateCache.file,
      config.dist + 'site/**/*.js',
      config.dist + 'site/**/*.html'
    );
    return utils.clean( files );
  } );

  gulp.task( 'clean', function () {
    var files = [].concat( config.dist, config.temp ); //config.report
    return utils.clean( files );
  } );

  /**
   * Run PageSpeed Insights TODO
   * https://developers.google.com/speed/docs/insights/v1/getting_started
   */
  gulp.task( '_pagespeed', function ( done ) {
    // Update the below URL to the public URL of your site
    pagespeed.output( 'localhost:8000', {
      strategy: 'web',
      // By default we use the PageSpeed Insights free (no API key) tier.
      // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
      key: '557549861690-1ombg8va0u6fces3kcvimtsnr4o59lei.apps.googleusercontent.com'
    }, done );
  } );

  // TODO Copy all files at the root level (app)
  gulp.task( '_copy', function () {
    return gulp.src( [
        'app/*',
        '!app/*.html'
      ], {
        dot: true
      } ).pipe( gulp.dest( 'dist' ) )
      .pipe( $.size( {
        title: 'copy'
      } ) );
  } );
} )();
