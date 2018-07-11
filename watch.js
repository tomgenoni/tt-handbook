var chokidar = require("chokidar");

var watcher = chokidar.watch("file, dir, glob, or array", {
    ignored: /(^|[\/\\])\../,
    persistent: true,
    awaitWriteFinish: true
});

watcher.add(["./docs/*", "./packages/*"]);

// Something to use when events are received.
var log = console.log.bind(console);
// Add event listeners.
watcher.on("change", path => log(`File ${path} has been changed`));
