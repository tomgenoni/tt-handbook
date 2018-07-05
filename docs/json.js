const fs = require("fs");
const cssjson = require("../node_modules/cssjson/cssjson.js");
const temp = "../tmp/";

fs.readdir(temp, (err, files) => {
    files.forEach(folder => {
        let folderPath = temp + folder + "/";
        let source = fs.readFileSync(folderPath + "index.css");
        let json = cssjson.toJSON(source);
        let filePath = folderPath + "index.json";

        fs.writeFile(filePath, JSON.stringify(json), function(err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });

        // let simpleJSON = [];

        // function noSlash(str) {
        //     return str.replace(/(\\)/g, "");
        // }
        // function noImportant(str) {
        //     return str.replace(/(\s!important)/g, "");
        // }

        // function cleanJSON(data) {
        //     for (var i in data) {
        //         var obj = {
        //             declarations: []
        //         };

        //         if (i.startsWith(".")) {
        //             obj["className"] = noSlash(i);
        //             for (var prop in data[i].attributes) {
        //                 obj.declarations.push({
        //                     property: prop,
        //                     value: noImportant(data[i].attributes[prop])
        //                 });
        //             }
        //             simpleJSON.push(obj);
        //         } else {
        //             cleanJSON(data[i].children);
        //         }
        //     }
        // }

        // function buildDocs(json) {
        //     json.forEach(function(i) {
        //         console.log(i.className + " {");
        //         i.declarations.forEach(function(i) {
        //             console.log(i.property + ": " + i.value + ";");
        //         });
        //         console.log("}");
        //     });
        // }

        // cleanJSON(css);
        // buildDocs(simpleJSON);
    });
});
