const fs = require("fs");
const cssjson = require("../node_modules/cssjson/cssjson.js");

let source = fs.readFileSync("./data/index.css");
let json = cssjson.toJSON(source.toString());
let css = json.children;
let simpleJSON = [];

function noSlash(str) {
    return str.replace(/(\\)/g, "");
}
function noImportant(str) {
    return str.replace(/(\s!important)/g, "");
}

function cleanJSON(data) {
    for (var i in data) {
        var obj = {
            declarations: []
        };

        if (i.startsWith(".")) {
            obj["className"] = noSlash(i);
            for (var prop in data[i].attributes) {
                obj.declarations.push({
                    property: prop,
                    value: noImportant(data[i].attributes[prop])
                });
            }
            simpleJSON.push(obj);
        } else {
            cleanJSON(data[i].children);
        }
    }
}

function buildDocs(json) {
    json.forEach(function(i) {
        console.log(i.className + " {");
        i.declarations.forEach(function(i) {
            console.log(i.property + ": " + i.value + ";");
        });
        console.log("}");
    });
}

cleanJSON(css);
buildDocs(simpleJSON);
