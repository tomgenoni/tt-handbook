const fs = require("fs"),
    sass = require("node-sass");

// Convert docs.scss
sass.render({ file: "./docs/examples.scss" }, function(error, result) {
    fs.writeFile("./dist/examples.css", result.css, function() {});
});
