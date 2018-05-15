var gulp        = require('gulp'),
    sass        = require('gulp-sass');

function swallowError(error) {
    console.log(error.message.toString())
    this.emit('end')
}
    
gulp.task('sass', function() {
    return gulp.src("src/*.scss")
        .pipe(sass({
            includePaths: [
                'node_modules'
            ]
        }))
        .pipe(gulp.dest("dist"));
});
    