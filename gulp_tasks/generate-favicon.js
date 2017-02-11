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
     * Generate the icons.
     * This task takes a few seconds to complete.
     * You should run it at least once to create the icons. Then, you should run it whenever
     * RealFaviconGenerator updates its package (see the check-favicon-update task).
     * @return {Stream}
     */
    module.exports = function( deps ) {
        gulp.task( 'generate-favicon', deps, function( done ) {
            utils.log( 'Generating favicon images for ios, desktop browser, windows, android, chrome and safari' );

            var options = {
              masterPicture: config.favicon,
              dest: config.dist + '/assets/img/favicon',
              iconsPath: '/assets/img/favicon',
              design: {
                ios: {
                  pictureAspect: 'backgroundAndMargin',
                  backgroundColor: '#ffffff',
                  margin: '18%',
                  assets: {
                    ios6AndPriorIcons: false,
                    ios7AndLaterIcons: false,
                    precomposedIcons: false,
                    declareOnlyDefaultIcon: true
                  },
                  appName: 'Ukebook'
                },
                desktopBrowser: {},
                windows: {
                  pictureAspect: 'noChange',
                  backgroundColor: '#ff5aff',
                  onConflict: 'override',
                  assets: {
                    windows80Ie10Tile: false,
                    windows10Ie11EdgeTiles: {
                      small: false,
                      medium: true,
                      big: false,
                      rectangle: false
                    }
                  },
                  appName: 'Ukebook'
                },
                androidChrome: {
                  pictureAspect: 'shadow',
                  themeColor: '#ffffff',
                  manifest: {
                    name: 'Ukebook',
                    display: 'standalone',
                    orientation: 'notSet',
                    onConflict: 'override',
                    declared: true
                  },
                  assets: {
                    legacyIcon: false,
                    lowResolutionIcons: false
                  }
                },
                safariPinnedTab: {
                  pictureAspect: 'blackAndWhite',
                  threshold: 66.25,
                  themeColor: '#1577ff'
                }
              },
              settings: {
                scalingAlgorithm: 'Mitchell',
                errorOnImageTooSmall: false
              },
              markupFile: config.faviconData
            };

            $.realFavicon.generateFavicon( options, function() { done(); });
        });
    };
})();
