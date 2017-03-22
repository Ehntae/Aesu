let gulp            = require("gulp");
let del             = require("del");
let inject          = require("gulp-inject-string");
let uglify          = require("gulp-uglify");
let pump            = require('pump');
let gulpTypescript  = require("gulp-typescript");
let runSync         = require("run-sequence");
let sourceMap       = require("gulp-sourcemaps");
    
let tsProj              = gulpTypescript.createProject("tsconfig.server.json");
let nodeSourcemapLoad   = "require('source-map-support').install({environment: 'node'});"


// Clean up serverside distribution
gulp.task("clean_all", () => {
   return del("./dist/server/**/*");
});

gulp.task("clean_code", () => {
   return del("./dist/server/**/*.ts");
});

gulp.task("clean_resources", () => {
   return del("./dist/server/resources/**/*");
});


// Copy over serverside resources to distribution
gulp.task("copy_resources", () => {
    return gulp.src("./development/server/resources/**/*")
        .pipe(gulp.dest("./dist/server/resources/"));
});


// Transpile server code
gulp.task("pump", callback => {
    pump([
        gulp.src("./development/server/**/*.ts"),
        sourceMap.init(),
        tsProj(),
        inject.after('"use strict";', nodeSourcemapLoad),
        sourceMap.write("./sourcemaps/"),
        gulp.dest("./dist/server/")
    ],
    callback)
});


// Watch files
gulp.task("watch", () => {
    
    gulp.watch("./development/server/**/*.ts", () => {
        runSync("clean_code", "pump", () => {
            console.log("Code cleaned and pumped")
        });
    });
    
    
    gulp.watch("./development/server/resources/**/*", () => {
        runSync("clean_resources", "copy_resources", () => {
            console.log("Resources cleaned and copied")
        });
    });
    
});


gulp.task("develop", () => {
    runSync("clean_all", "copy_resources", "pump", () => {
        console.log("Initiated development watch");
        gulp.start("watch");
    });
});