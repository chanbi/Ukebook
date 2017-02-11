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
     * Check for updates on RealFaviconGenerator (think: Apple has just released a new Touch icon
     * along with the latest version of iOS).
     * Run this task from time to time.
     * Ideally, make it part of your continuous integration system.
     * @return {Stream}
     */
    module.exports = function( deps ) {
        gulp.task( 'check-favicon-update', deps, function( done ) {
            var currentVersion = JSON.parse(fs.readFileSync( config.faviconData )).version;
            $.realFavicon.checkForUpdates( currentVersion, function( err ) {
                if ( err ) { throw err; }
            });
        });
    };
})();
