"use strict";

const fs = require("fs");

let rawdata = fs.readFileSync("./data/index.json");
let json = JSON.parse(rawdata);
let css = json.children;
let zoo = [];

function removeSlashes(str) {
    return str.replace(/(\\)/g, "");
}

function cleanJSON(data) {
    for (var i in data) {
        var obj = {};
        obj.declarations = [];

        if (i.startsWith(".")) {
            obj["className"] = removeSlashes(i);
            for (var prop in data[i].attributes) {
                obj.declarations.push({
                    property: prop,
                    value: data[i].attributes[prop]
                });
            }
        } else {
            cleanJSON(data[i].children);
        }
        zoo.push(obj);
    }
}

cleanJSON(css);

console.log(zoo);
