(function() {
    'use strict';

    var gulp = require( 'gulp' );
    var config = require( '../gulp.config' );
    var fs = require( 'fs' );
    var utils = require( '../gulp.utils' );
    var $ = require( 'gulp-load-plugins' )({
        lazy: true
    });

    /**
     * Inject the favicon markups in your HTML pages.
     * You should run this task whenever you modify a page.
     * You can keep this task as is or refactor your existing HTML pipeline.
     * @return {Stream}
     */
    module.exports = function( deps ) {
        gulp.task( 'inject-favicon', deps, function() {
            utils.log( 'Injecting the favicon markups in HTML pages' );

            return gulp
              .src([ 'TODO: List of the HTML files where to inject favicon markups. For example, ["dist/*.html", "dist/misc/*.html"]' ])
              .pipe( $.realFavicon.injectFaviconMarkups( JSON.parse( fs.readFileSync( config.faviconData )).favicon.html_code ))
              .pipe( gulp.dest( config.dist ));
        });
    };
})();
