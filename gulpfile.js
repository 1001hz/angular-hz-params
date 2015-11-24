// Include Gulp
var gulp = require('gulp');
// Include plugins
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
    replaceString: /\bgulp[\-.]/
});
var concat = require('gulp-concat');
var del = require('del');
var Q = require('q');
var angularFilesort = require('gulp-angular-filesort');
var inject = require('gulp-inject');
var series = require('stream-series');

var paths = {
    devScripts: 'src/**/*.js',
    module: 'src/js/angular-hz-params/*.js',
    dist: "dist",
    srcIndex: 'src/index.html',
    dev: 'dev'
}

var pipes = {};

gulp.task('clean', function () {
    var deferred = Q.defer();
    del([paths.dist + '/*'], function () {
        deferred.resolve();
    });
    return deferred.promise;
});

pipes.orderedScripts = function () {
    return angularFilesort();
};

pipes.validatedAppScripts = function () {
    return gulp.src([paths.devScripts,'!'+paths.module,'!src/tests/*.js'])
        .pipe(plugins.jshint());
};

pipes.validatedModuleScripts = function () {
    return gulp.src([paths.module])
        .pipe(plugins.jshint());
};

pipes.builtVendorScriptsDev = function () {
    return gulp.src(plugins.mainBowerFiles())
        .pipe(plugins.filter('*.js'))
        .pipe(gulp.dest(paths.dev + '/vendor'));
}



pipes.builtAppScript = function () {
    var validatedAppScripts = pipes.validatedAppScripts();

    return validatedAppScripts
        .pipe(pipes.orderedScripts())
        .pipe(plugins.concat('app.js'))
        .pipe(gulp.dest(paths.dev));
};

pipes.builtModuleScript = function () {
    var validatedModuleScripts = pipes.validatedModuleScripts();

    return validatedModuleScripts
        .pipe(pipes.orderedScripts())
        .pipe(plugins.concat('angular-hz-params.js'))
        .pipe(gulp.dest(paths.dist));
};

pipes.builtModuleScriptMin = function () {
    var validatedModuleScripts = pipes.validatedModuleScripts();

    return validatedModuleScripts
        .pipe(pipes.orderedScripts())
        .pipe(plugins.concat('angular-hz-params.min.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(paths.dist));
};

pipes.built = function () {
    var appScripts = pipes.builtAppScript();
    var moduleScripts = pipes.builtModuleScript();
    var builtVendorScripts = pipes.builtVendorScriptsDev();
    pipes.builtModuleScriptMin();

    return gulp.src(paths.srcIndex)
        .pipe(gulp.dest(paths.dev)) // write first to get relative path for inject
        .pipe(inject(series(builtVendorScripts, appScripts, moduleScripts), { relative: true }))
        .pipe(gulp.dest(paths.dev));
};

pipes.builtMin = function () {
    var appScripts = pipes.builtAppScript();
    var moduleScripts = pipes.builtModuleScriptMin();
    var builtVendorScripts = pipes.builtVendorScriptsDev();
    pipes.builtModuleScript();

    return gulp.src(paths.srcIndex)
        .pipe(gulp.dest(paths.dev)) // write first to get relative path for inject
        .pipe(inject(series(builtVendorScripts, appScripts, moduleScripts), { relative: true }))
        .pipe(gulp.dest(paths.dev));
};

gulp.task('default', ['clean'], pipes.built);
gulp.task('min', ['clean'], pipes.builtMin);