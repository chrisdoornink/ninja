module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    clean: {
      dist: ['dist']
    },
    concat: {
      options: {
        separator: ';',
      },
      js: {
        src: ['app/scripts/base-classes/*', 'app/scripts/extended-classes/*', 'app/scripts/levels/**/*', 'app/scripts/*', 'app/start.js'],
        dest: 'dist/app/ninja.js',
      },
      libs: {
        src: ['libs/*'],
        dest: 'dist/app/vendor.js',
      },
      styles: {
        src: ['app/styles/*'],
        dest: 'dist/app/ninja.css',
      }
    },
    copy: {
      dist: {
        files: [
          {src: 'app/index.html', dest: 'dist/'},
          {src: 'assets/**', dest: 'dist/app/'},
        ]
      }
    },
    'http-server': {
      'dev': {
        root: 'dist/app/',
        port: 8081,
        host: "127.0.0.1",
        // host: "0.0.0.0",
        cache: 1,
        showDir : true,
        autoIndex: true,
        // server default file extension
        ext: "html",
        // run in parallel with other tasks
        runInBackground: true,
        openBrowser : false,
      }
    },
    watch: {
      dev: {
        files: ['app/**/*', 'assets/**/*'],
        tasks: ['build'],
        options: {
          livereload: true,
        },
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', ['build', 'http-server', 'watch']);
  grunt.registerTask('build', ['clean', 'concat', 'copy']);
};
