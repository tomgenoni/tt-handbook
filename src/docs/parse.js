"use strict";

const fs = require("fs");

let rawdata = fs.readFileSync("./data/index.json");
let json = JSON.parse(rawdata);
let css = json.children;

let data = {};

for (var i in css) {
    if (i.startsWith(".")) {
        console.log("class: " + i);
        for (var prop in css[i].attributes) {
            console.log("prop: " + prop);
            console.log("value: " + css[i].attributes[prop]);
        }
        console.log("------");
    } else {
        for (var className in css[i].children) {
            console.log("class: " + className);
            for (var prop in css[i].children[className].attributes) {
                console.log("prop: " + prop);
                console.log(
                    "value: " + css[i].children[className].attributes[prop]
                );
            }
            console.log("------");
        }
    }
}
