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
function filterIndex(data) {
    const source = fs.readFileSync("./docs/views/cssList.handlebars", "utf8");
    const template = hb.compile(source);
    const result = template(data);
    fs.writeFile("./dist/list.html", result, function () { });
}

// Build the Classes list
function cssDisplay(css) {
    let json = cssjson.toJSON(css.toString());
    let jsonCSS = [];

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

    cleanJSON(json.children);

    let source = fs.readFileSync("./docs/views/class-entry-filter.handlebars", "utf8");
    let template = hb.compile(source);
    let result = template(jsonCSS);

    return result;
}

function getCSS(file) {
    // Compile SCSS
    // let compiled = sass.renderSync({ file: packages + file + "/index.scss" });
    // let css      = compiled.css.toString();
    // let cssObj   = cssDisplay(css);
    console.log(file);
}

//Get all the packages
fs.readdir(packages, (err, files) => {
    files.forEach(file => {
        if (!file.startsWith(".")) {
            getCSS(file);
        }
    });
});
