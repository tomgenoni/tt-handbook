const fs = require("fs-extra"),
    sass = require("node-sass");

// Copy JS
fs.copy("./docs/js", "./dist/js", err => {
    if (err) return console.error(err);
});

// Compile CSS
fs.ensureDir('./dist/css', err => {

    sass.render({
        file: "./docs/scss/tui.scss"
    }, function (error, result) {
        fs.writeFile("./dist/css/tui.css", result.css, function () {});
    });

    sass.render({
        file: "./docs/scss/utils.scss"
    }, function (error, result) {
        fs.writeFile("./dist/css/utils.css", result.css, function () {});
    });

    sass.render({
        file: "./docs/scss/examples.scss"
    }, function (error, result) {
        fs.writeFile("./dist/css/examples.css", result.css, function () {});
    });
})


