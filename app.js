const fs = require("fs"),
    cssjson = require("cssjson"),
    hb = require("handlebars"),
    md = require("marked");

const packages = "./packages/";
const obj = [];

function cleanClass(str) {
    return str.replace(/(\.|\\)/g, "");
}
function noImportant(str) {
    return str.replace(/(\s!important)/g, "");
}

function buildDoc(data) {
    let source = fs.readFileSync("./docs/views/index.handlebars", "utf8");
    let template = hb.compile(source);
    let result = template(data);
    fs.writeFile("./dist/index.html", result, function() {});
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
    var rawCSS = fs.readFileSync("./tmp/" + file + "/index.css").toString();

    var content = md(rawReadme) + cssDisplay(rawCSS);
    obj.push({ title: file, content: content });
}

fs.readdir(packages, (err, files) => {
    files.forEach(file => {
        if (!file.startsWith(".")) {
            getContent(file);
        }
    });
    buildDoc(obj);
});
