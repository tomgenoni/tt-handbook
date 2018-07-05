var gulp = require("gulp"),
    fs = require("fs"),
    sass = require("gulp-sass"),
    gulpFn = require("gulp-fn"),
    wrap = require("gulp-wrap"),
    clean = require("gulp-clean"),
    concat = require("gulp-concat"),
    markdown = require("gulp-markdown"),
    cssjson = require("cssjson");

gulp.task("clean", function() {
    return gulp.src("./tmp", { read: false }).pipe(clean());
});

gulp.task("css:each", function() {
    return gulp
        .src("src/utils/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./tmp"));
});

gulp.task("css:docs", function() {
    return gulp
        .src("docs/docs.scss")
        .pipe(sass())
        .pipe(gulp.dest("./dist"));
});

gulp.task("copy:markdown", function() {
    return gulp.src("./src/utils/**/readme.md").pipe(gulp.dest("./tmp"));
});

gulp.task("doc", function() {
    return gulp
        .src("./tmp/**/readme.md")
        .pipe(concat("index.html"))
        .pipe(markdown())
        .pipe(wrap({ src: "./docs/template.html" }))
        .pipe(gulp.dest("./dist/"));
});

gulp.task("json", function() {
    gulp.src("./tmp/**/index.css").pipe(
        gulpFn(function(file) {
            let directory = file.path.substring(0, file.path.lastIndexOf("/"));
            let readme = directory + "/readme.md";
            let source = fs.readFileSync(file.path);
            let json = cssjson.toJSON(source.toString());
            let css = json.children;
            let simpleJSON = [];

            function cleanClass(str) {
                return str.replace(/(\.|\\)/g, "");
            }
            function noImportant(str) {
                return str.replace(/(\s!important)/g, "");
            }

            function cleanJSON(data) {
                for (var i in data) {
                    var obj = {
                        declarations: []
                    };

                    if (i.startsWith(".")) {
                        obj["className"] = cleanClass(i);
                        for (var prop in data[i].attributes) {
                            obj.declarations.push({
                                property: prop,
                                value: noImportant(data[i].attributes[prop])
                            });
                        }
                        simpleJSON.push(obj);
                    } else {
                        cleanJSON(data[i].children);
                    }
                }
            }

            function appendToReadme(html) {
                fs.appendFile(readme, html, function(err) {
                    if (err) {
                        return console.log(err);
                    }
                });
            }

            function buildHTML(json) {
                html = "\n\n";
                html += "<h2>Class list</h2>\n";
                html += "<div class='bg-gray-200 bt b--gray-300'>\n";
                json.forEach(function(i) {
                    html += "<div class='flex bb b--gray-300 pv2 ph3'>\n";
                    html += "<code class='w-2/5'>" + i.className + "</code>\n";
                    html += "<code class='w-3/5'>";
                    i.declarations.forEach(function(i) {
                        html +=
                            "<div>" + i.property + ": " + i.value + ";</div>\n";
                    });
                    html += "</code>\n";
                    html += "</div>\n";
                });
                html += "</div>\n";
                appendToReadme(html);
            }

            cleanJSON(css);
            buildHTML(simpleJSON);
        })
    );
});
