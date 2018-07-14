const fs = require("fs-extra");

// Move the index.html
fs.copy("./docs/index.html", "./dist/index.html", err => {
    if (err) return console.error(err);
});
