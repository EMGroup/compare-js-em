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
				'compare-js-em.js',
				'scripts/**',
				'.nojekyll',
				'node_modules/@construit/highlighter/css/construit-highlighter.css',
				'node_modules/@construit/scriptbox/css/interpreter.css',
				'node_modules/@construit/scriptbox/css/gutter.css']
	},
	browserify: {
		'compare-js-em.js': ['index.js']
	}
  });

  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.registerTask('default', ['browserify']);
};

