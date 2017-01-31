( function () {
  'use strict';

  var gulp = require( 'gulp' );
  var del = require( 'del' );
  var config = require( './gulp.config' );
  var $ = require( 'gulp-load-plugins' )( {
    lazy: true
  } );

  module.exports = ( function () {
    var utils = {
      task: task,
      clean: clean,
      log: log,
      inject: inject,
      logFileChangeEvent: logFileChangeEvent,
      BytediffFormatter: BytediffFormatter
    };

    return utils;

    function task( name, deps ) {
      return require( './gulp_tasks/' + name )( deps );
    }

    function clean( path, done ) {
      log( 'Cleaning:' + path );
      return del( path, done );
    }

    function log( msg ) {
      if ( typeof ( msg ) === 'object' ) {
        for ( var item in msg ) {
          if ( msg.hasOwnProperty( item ) ) {
            $.util.log( $.util.colors.blue( msg[ item ] ) );
          }
        }
      }
      else {
        $.util.log( $.util.colors.blue( msg ) );
      }
    }

    function inject( src, label ) {
      var options = {
        relative: true
      };

      if ( label ) {
        options.name = 'inject:' + label;
      }

      return $.inject( gulp.src( src, {
        read: false
      } ), options );
    }

    function logFileChangeEvent( event ) {
      var srcPattern = new RegExp( '/.*(?=/' + config.src + ')/' );
      log( 'File ' + event.path.replace( srcPattern, '' ) + ' ' + event.type );
    }

    /**
     * Formatter for bytediff to display the size changes after processing
     */
    function BytediffFormatter( byteData ) {
      var difference = ( byteData.savings > 0 ) ? ' smaller.' : ' larger.';
      return byteData.fileName + ' went from ' +
        ( byteData.startSize / 1000 ).toFixed( 2 ) + ' kB to ' +
        ( byteData.endSize / 1000 ).toFixed( 2 ) + ' kB and is ' +
        formatPercent( 1 - byteData.percent, 2 ) + '%' + difference;

      function formatPercent( num, precision ) {
        return ( num * 100 ).toFixed( precision );
      }
    }
  } )();
} )();
