module.exports = function(grunt) {
  "use strict";

  // Project configuration
  grunt.initConfig({
    // Metadata
    pkg: grunt.file.readJSON('package.json'),

    // Task configuration
    babel: {
      options: {
        sourceMap: false,
        retainLines: true,
        comments: false,
        presets: ["es2015"]
      },

      es5: {
        files: {
        	"build/es5/index.js": "index.js",
          "build/es5/lib/CallableStub.js": "lib/CallableStub.js",
          "build/es5/lib/FunctionStub.js": "lib/FunctionStub.js",
          "build/es5/lib/PropertyStub.js": "lib/PropertyStub.js",
          "build/es5/lib/ObjectStub.js": "lib/ObjectStub.js",
          "build/es5/lib/Response.js": "lib/Response.js",
          "build/es5/lib/ArguedResponses.js": "lib/ArguedResponses.js",
          "build/es5/lib/IndexedResponses.js": "lib/IndexedResponses.js",
          "build/es5/lib/Responses.js": "lib/Responses.js"
        }
      }
    },

    clean: {
      es5: {
        src: ["build/es5", "dist/es5"]
      }
    },

    copy: {
    	nodejs: {
    		files: [
    		  {cwd: "build/es5/", src: ["index.js", "lib/*.js"], dest: "dist/es5/nodejs/<%= pkg.name %>/", expand: true},
    		  {src: ["package.json", "README.md"], dest: "dist/es5/nodejs/<%= pkg.name %>/", expand: true}
    		]
    	}
    },

    jshint: {
      gruntfile: {
        src: ["Gruntfile.js"]
      },

      lib: {
        options: {
          jshintrc: true
        },

        src: ["index.js", "lib/**"]
      },

      test: {
        options: {
        	jshintrc: true,
          ignores: [
            "test/mocha.opts"
          ]
        },

        src: ["test/**"]
      }
    },

    mochaTest:{
    	options: {
    		ignoreLeaks: false,
    		quiet: false,
    		reporter: "spec",
  			timeout: 1500
    	},

      es5: {
        options: {
          require: [
            "sinon",
            "justo-assert"
          ]
        },

        src: [
          "test/unit/index.js",
          "test/unit/lib/*.js"
        ]
      }
    }
  });

  // These plugins provide necessary tasks
  grunt.loadNpmTasks("grunt-babel");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks("grunt-mocha-test");
  grunt.loadNpmTasks("grunt-travis-lint");

  //aliases
  grunt.registerTask("buildes5", ["travis-lint", "jshint", "clean:es5", "babel:es5", "copy:nodejs"]);
  grunt.registerTask("es5", ["buildes5", "mochaTest:es5"]);

  // Default task
  grunt.registerTask("default", []);
};
