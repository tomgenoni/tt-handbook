const fs = require("fs-extra"),
    cssjson = require("cssjson"),
    hb = require("handlebars"),
    sass = require("node-sass"),
    Prism = require("prismjs"),
    marked = require("marked");

// Options

marked.setOptions({
    highlight: function(code, lang) {
        return Prism.highlight(code, Prism.languages[lang], lang);
    }
});

// Variables

const packages = "./packages/";
const allContentObj = [];
const dirDist = "./dist";
const dirCSS = "./dist/css";

// Helper functions

hb.registerHelper("formatTitle", function(str) {
    return str.replace(/(-)/g, " ");
});

function cleanClass(str) {
    return str.replace(/(\.|\\)/g, "");
}
function noImportant(str) {
    return str.replace(/(\s!important)/g, "");
}
function getHex(str) {
    let html = "";
    if (str.startsWith("#")) {
        html = `<span class="w1 h1 ml1 dib v-mid" style="background: ${str}"></span>`;
    }
    return html;
}

// Build the docs

function buildDist(data) {
    let source = fs.readFileSync("./docs/views/doc.handlebars", "utf8");
    let template = hb.compile(source);
    let result = template(data);
    fs.writeFile("./dist/doc.html", result, function() {});

    // Convert tui.scss
    sass.render({ file: "./docs/scss/tui.scss" }, function(error, result) {
        fs.writeFile("./dist/css/tui.css", result.css, function() {});
    });

    // Convert util.scss
    sass.render({ file: "./docs/scss/utils.scss" }, function(error, result) {
        fs.writeFile("./dist/css/utils.css", result.css, function() {});
    });

    // Move the index.html
    fs.copy("./docs/index.html", "./dist/index.html", err => {
        if (err) return console.error(err);
    });
}

function buildCSSList(data) {
    let source = fs.readFileSync("./docs/views/cssList.handlebars", "utf8");
    let template = hb.compile(source);
    let result = template(data);
    fs.writeFile("./dist/list.html", result, function() {});
}

// Build the Classes list
function cssDisplay(cssStr) {
    let json = cssjson.toJSON(cssStr.toString());
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
                    let value = noImportant(data[i].attributes[prop]);
                    cssObj.declarations.push({
                        property: prop,
                        value: value,
                        hex: getHex(value)
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

// Read in all the date from the "readme" and "index.scss"
function getContent(file) {
    // Convert readme
    var rawReadme = fs.readFileSync(packages + file + "/readme.md").toString();
    var markdown = marked(rawReadme);

    // Convert SCSS
    var rawCSS = sass.renderSync({ file: packages + file + "/index.scss" });
    var css = rawCSS.css.toString();
    var cssFormatted = cssDisplay(css);

    // Combine the data for each package
    var content = markdown + cssFormatted;
    allContentObj.push({
        title: file,
        content: content,
        cssList: cssFormatted
    });
}

function init() {
    fs.removeSync(dirDist);

    fs.ensureDir(dirDist, err => {
        if (err) return console.error(err);
    });

    fs.ensureDir(dirCSS, err => {
        if (err) return console.error(err);
    });

    //Get all the packages
    fs.readdir(packages, (err, files) => {
        files.forEach(file => {
            if (!file.startsWith(".")) {
                getContent(file);
            }
        });
        // allContentObj is created in getContent()
        buildDist(allContentObj);
        buildCSSList(allContentObj);
    });
}

init();
