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
      server: ['app/**/*.js','test/**/*.js']
    },
    mochaTest: {
      unit: {
        options: {
          reporter: 'spec'
        },
        src: ['test/unit/init.js','test/unit/*.test.js','test/unit/**/*.test.js']
      },
      e2e: {
        options: {
          reporter: 'spec'
        },
        src: ['test/e2e/init.js','test/e2e/*.test.js','test/e2e/**/*.test.js']
      }
    },
    watch: {
      dev: {
        files: ['*.js','actions/*.js','helpers/*.js','models/*.js','services/*.js'],
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