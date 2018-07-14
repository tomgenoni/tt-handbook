const fs = require("fs-extra"),
    sass = require("node-sass");

fs.ensureDir('./dist/css', err => {
    // Convert tui.scss
    sass.render({
        file: "./docs/scss/tui.scss"
    }, function (error, result) {
        fs.writeFile("./dist/css/tui.css", result.css, function () {});
    });

    // Convert util.scss
    sass.render({
        file: "./docs/scss/utils.scss"
    }, function (error, result) {
        fs.writeFile("./dist/css/utils.css", result.css, function () {});
    });

    // Convert util.scss
    sass.render({
        file: "./docs/scss/examples.scss"
    }, function (error, result) {
        fs.writeFile("./dist/css/examples.css", result.css, function () {});
    });
})