module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            build: {
                files: ['css/*.css', 'js/*.js', 'js/irview/*.js'],
                tasks: ['uglify:buildall'],
                options: {
                    spawn: false
                }
            }
        },
        copy: {
            main: {
                files: [{
                    src: ['path/*'],
                    dest: 'dest/',
                    filter: 'isFile'
                }, {
                    src: ['path/**'],
                    dest: 'dest/'
                }]
            }
        },
        clean: {
            build: {
                src: ["path/to/dir/one", "path/to/dir/two"]
            }
        },
        concat: {
            options: {
                separator: '\n',
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                src: ['js/irview/*.js'],
                dest: 'build/irview.js'
            }
        },
        concat: {
            basic_and_extras: {
                files: {
                    'all.js': ['a.js'],
                    'all-sec': ['b.js', 'c.js'],
                },
            }
        },
        uglify: {
            options: {
                mangle: true,
                preserveComments: false,
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n' // footer
            },
            build: {
                files: [{
                    'build/irview.min.js': ['js/irview/*.js']
                }]
            }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.registerTask('default', ['concat']);
};