var gulp = require("gulp"),
    fs = require("fs"),
    sass = require("gulp-sass"),
    path = require("path"),
    gulpFn = require("gulp-fn"),
    cssjson = require("cssjson");

gulp.task("css", function() {
    return gulp
        .src("src/utils/**/*.scss")
        .pipe(
            sass({
                includePaths: ["node_modules"]
            })
        )
        .pipe(gulp.dest("./tmp"));
});

gulp.task("json", function() {
    gulp.src("./tmp/**/index.css").pipe(
        gulpFn(function(file) {
            var source = fs.readFileSync(file.path);
            var json = cssjson.toJSON(source);
            var directory = file.path.substring(0, file.path.lastIndexOf("/"));
            var jsonFile = directory + "/index.json";
            fs.writeFile(jsonFile, JSON.stringify(json), function(err) {
                if (err) {
                    return console.log(err);
                }
            });
        })
    );
});

gulp.task("copy", function() {
    return gulp.src("./src/utils/**/readme.md").pipe(gulp.dest("./tmp/"));
});
