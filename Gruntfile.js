module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compass: {
      dist: {
        options: {
          raw: 'require "compass/import-once/activate"\n',
          sassDir:'sass',
          cssDir:'css',
          cacheDir:'.sass-cache',
          httpPath:'/',
          imagesDir:'img',
          javascriptsDir:'js',
          outputStyle:'compressed'
        }
      }
    },
    uglify: {
      options: {
        mangle:true,
        compress:true
      },
      all: {
        files: [{
          expand: true,
          cwd: 'js',
          src: ['*.src.js', '!*.min.js'],
          dest: 'js',
          ext: '.min.js'
        }],
      },
    },
    watch: {
      scripts: {
        files:[
          'js/*.src.js'
        ],
        tasks:['uglify'],
        options: {
          spawn:false,
          livereload:true
        },
      },
      css: {
        files:[
          'sass/*.scss'
        ],
        tasks:['compass'],
        options: {
          spawn:false,
          livereload:true
        }
      },
      html: {
        files:['*.html'],
        options: {
          spawn:false,
          livereload:true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['compass', 'uglify']);
};
