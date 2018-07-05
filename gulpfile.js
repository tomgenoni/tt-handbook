var gulp = require("gulp"),
    fs = require("fs"),
    sass = require("gulp-sass"),
    gulpFn = require("gulp-fn"),
    clean = require("gulp-clean"),
    cssjson = require("cssjson");

gulp.task("clean", function() {
    return gulp.src("./tmp", { read: false }).pipe(clean());
});

gulp.task("css", function() {
    return gulp
        .src("src/utils/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./tmp"));
});

gulp.task("copy", function() {
    return gulp.src("./src/utils/**/readme.md").pipe(gulp.dest("./tmp"));
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

            function noSlash(str) {
                return str.replace(/(\\)/g, "");
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
                        obj["className"] = noSlash(i);
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
