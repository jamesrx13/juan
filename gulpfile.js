/*
 * Dependencias
 */
import gulp from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import zip from "gulp-zip";

const sass = gulpSass(dartSass);
const { src, dest, watch, task, series, parallel } = gulp;

//SASS
var watchingSassFiles = ["./src/statics/sass/**/*.scss"];
var compileSassFiles = [
  "./src/statics/sass/**/*.scss",
  "!./src/statics/sass/import/**/*.scss",
];
var cssDest = "./src/statics/css";

function sassCompileGeneric() {
  return src(compileSassFiles)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(sourcemaps.write("./"))
    .pipe(dest(cssDest));
}

task("sass", (done) => {
  sassCompileGeneric();
  done();
});
function watchFiles(done) {
  watch(watchingSassFiles, series("sass"));
  done();
}
task("sass:watch", watchFiles);
task("sass:init", (done) => {
  sassCompileGeneric();
  done();
});

//Compilar todo
task("sass-all", (done) => {
  sassCompileGeneric();
  done();
});
task("sass-all:watch", (done) => {
  parallel("sass-all", "sass:watch")();
  done();
});

//General
task("init-project", (done) => {
  parallel("sass-all")();
  done();
});
task("init-project:watch", (done) => {
  parallel("init-project", "sass-all", "sass-all:watch")();
  done();
});

//Empaquetar para Volt
task("bundle", (done) => {
  src([
    "./**",
    "!./node_modules/**",
    "!./platforms/**",
    "!./plugins/**",
    "!./bundle.zip",
    "!./gulpfile.js",
    "!./package-lock.json",
  ])
    .pipe(zip("bundle.zip"))
    .pipe(dest("./"));
  done();
});

//Empaquetar para Web
task("bundle-web", (done) => {
  src(["./src/**"]).pipe(zip("bundle-web.zip")).pipe(dest("./"));
  done();
});

export default series(sassCompileGeneric, watchFiles);
