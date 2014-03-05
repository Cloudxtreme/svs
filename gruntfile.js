'use strict';
module.exports = function(grunt){

  //config
  grunt.initConfig({
    nodemon: {
      dev: {
        options: {
          file: 'app.js',
          nodeArgs: ['--debug'],
          watchedExtensions: ['js'],
          watchedFolders: ['app']
        }
      }
    },
    jshint: {
      options: {
        jshintrc: true,
        reporter: require('jshint-stylish')
      },
      server: ['*.js','test/*.js']
    },
    mochaTest: {
      unit: {
        options: {
          reporter: 'spec'
        },
        src: ['test/*.test.js']
      }
    },
    watch: {
      dev: {
        files: ['*.js'],
        tasks: ['test']
      }
    },
    concurrent: {
      dev: {
        tasks: ['nodemon:dev','watch:dev'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    projectUpdate: {
      update: {}
    }
  })

  //load tasks
  grunt.loadNpmTasks('grunt-concurrent')
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-mocha-test')
  grunt.loadNpmTasks('grunt-nodemon')
  grunt.loadNpmTasks('grunt-project-update')

  //macros
  grunt.registerTask('update',['projectUpdate'])
  grunt.registerTask('test',['jshint','mochaTest:unit'])
  grunt.registerTask('dev',['concurrent:dev'])
  grunt.registerTask('start',['nodemon:production'])

}