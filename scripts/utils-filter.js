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
const jsonCSS  = [];

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

// Filter index
function buildPage(data) {
    const source   = fs.readFileSync("./docs/views/page/filter.handlebars", "utf8");
    const template = hb.compile(source);
    const result   = template(data);
    fs.writeFile("./dist/filter.html", result, function () { });
}

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
            jsonCSS.push(cssObj);
        } else {
            // It's a @media block with nested rules
            cleanJSON(data[i].children);
        }
    }
}

// Build the Classes list
function formatCSS(css) {
    let json = cssjson.toJSON(css.toString());
    cleanJSON(json.children);
}

function getCSS(file) {
    //  Compile SCSS
    let compiled     = sass.renderSync({ file: packages + file + "/index.scss" });
    let css          = compiled.css.toString();
    var cssFormatted = formatCSS(css);
}

//Get all the packages
fs.readdir(packages, (err, files) => {
    files.forEach(file => {
        if (!file.startsWith(".")) {
            getCSS(file);
        }
    });
    buildPage(jsonCSS);
});
