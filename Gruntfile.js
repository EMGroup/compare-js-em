/*
 * Used by `grunt` - see gruntjs.com.
 *
 * The purpose of this file is to help with working on the eden-js grammar, the
 * 'jison' task will generate the parser, the default task runs a web server
 * for testing the grammar and automatically regenerates the parser when the
 * grammar file changes.
 */

'use strict';

module.exports = function (grunt) {


  grunt.initConfig({
	'gh-pages': {
		src: ['index.html',
				'scripts/**',
				'node_modules/@construit/highlighter/css/construit-highlighter.css',
				'node_modules/@construit/scriptbox/css/interpreter.css',
				'node_modules/@construit/scriptbox/css/gutter.css',
				'node_modules/@construit/scriptbox/construit-scriptbox.min.js',
				'node_modules/@construit/runtime/construit-runtime.min.js',
				'node_modules/esprima/dist/esprima.js']
	},
  });

  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.registerTask('default', ['gh-pages']);
};

