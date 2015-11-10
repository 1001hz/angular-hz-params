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

var paths = {
    scripts: 'src/**/*.js',
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

pipes.orderedAppScripts = function () {
    return angularFilesort();
};

pipes.validatedAppScripts = function () {
    return gulp.src([paths.scripts,'!src/tests/*.js'])
        .pipe(plugins.jshint());
};

pipes.builtVendorScriptsDev = function () {
    return gulp.src(plugins.mainBowerFiles())
        .pipe(plugins.filter('*.js'))
        .pipe(gulp.dest(paths.dev + '/vendor'));
}

pipes.builtScript = function () {
    var validatedAppScripts = pipes.validatedAppScripts();

    return validatedAppScripts
        .pipe(pipes.orderedAppScripts())
        .pipe(plugins.concat('angular-hz-params.js'))
        .pipe(gulp.dest(paths.dist));
};

pipes.builtScriptMin = function () {
    var validatedAppScripts = pipes.validatedAppScripts();

    return validatedAppScripts
        .pipe(pipes.orderedAppScripts())
        .pipe(plugins.concat('angular-hz-params.min.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(paths.dist));
};

pipes.built = function () {
    var script = pipes.builtScript();
    var builtVendorScriptsDev = pipes.builtVendorScriptsDev();
    //pipes.builtScriptMin();

    return gulp.src(paths.srcIndex)
        .pipe(gulp.dest(paths.dev)) // write first to get relative path for inject
        .pipe(inject(script, { relative: true }))
        .pipe(gulp.dest(paths.dev));
};
gulp.task('default', ['clean'], pipes.built);