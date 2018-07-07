const fs = require("fs"),
    cssjson = require("cssjson"),
    hb = require("handlebars"),
    sass = require("node-sass"),
    md = require("marked");

const packages = "./packages/";
const obj = [];

hb.registerHelper("formatTitle", function(str) {
    return str.replace(/(-)/g, " ");
});

function cleanClass(str) {
    return str.replace(/(\.|\\)/g, "");
}
function noImportant(str) {
    return str.replace(/(\s!important)/g, "");
}

function buildDist(data) {
    // index.html
    let source = fs.readFileSync("./docs/views/index.handlebars", "utf8");
    let template = hb.compile(source);
    let result = template(data);
    fs.writeFile("./dist/index.html", result, function() {});

    // Copy assets
    sass.renderSync({
        file: "./docs/docs.scss",
        outFile: "./dist/docs.css"
    });

    sass.render(
        {
            file: "./docs/docs.scss",
            outFile: "./dist/docs.css"
        },
        function(error, result) {
            if (!error) {
                fs.writeFile("./dist/docs.css", result.css, function(err) {
                    if (!err) {
                        //file written on disk
                    }
                });
            }
        }
    );
}

function cssDisplay(str) {
    let json = cssjson.toJSON(str.toString());
    let simpleJSON = [];

    let source = fs.readFileSync("./docs/views/classList.handlebars", "utf8");
    let template = hb.compile(source);

    function cleanJSON(data) {
        for (var i in data) {
            var cssObj = {
                declarations: []
            };
            // Checks if it's a class
            if (i.startsWith(".")) {
                cssObj["className"] = cleanClass(i);
                for (var prop in data[i].attributes) {
                    cssObj.declarations.push({
                        property: prop,
                        value: noImportant(data[i].attributes[prop])
                    });
                }
                simpleJSON.push(cssObj);
            } else {
                // It's a @media block with nested rules
                cleanJSON(data[i].children);
            }
        }
    }

    cleanJSON(json.children);

    let result = template(simpleJSON);
    return result;
}

function getContent(file) {
    var rawReadme = fs.readFileSync(packages + file + "/readme.md").toString();
    var rawCSS = sass.renderSync({ file: packages + file + "/index.scss" });
    var css = rawCSS.css.toString();

    var content = md(rawReadme) + cssDisplay(css);
    obj.push({ title: file, content: content });
}

function init() {
    fs.readdir(packages, (err, files) => {
        files.forEach(file => {
            if (!file.startsWith(".")) {
                getContent(file);
            }
        });
        buildDist(obj);
    });
}

init();
