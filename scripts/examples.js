const fs = require("fs-extra"),
    Prism = require("prismjs"),
    hb = require("handlebars");

const examplesPath = "./docs/examples/";
const exampleTemplate = "./docs/views/page/example.handlebars";
const exampleIndexTemplate = "./docs/views/page/example-index.handlebars";
const dirExamples = "./dist/examples/";
const examplesArr = [];

function highlight(lang, sourceCode) {
    const language = Prism.languages[lang] || Prism.languages.autoit;
    return Prism.highlight(sourceCode, language);
}

function buildIndexData(file) {
    examplesArr.push({
        title: file
    });
}

function getCode(file) {
    const filepath = examplesPath + file + "/index.html";
    const html = fs.readFileSync(filepath).toString();

    const data = {
        html: html,
        code: highlight("html", html)
    };

    let source = fs.readFileSync(exampleTemplate, "utf8");
    let template = hb.compile(source);
    let result = template(data);

    fs.writeFile(
        "./dist/examples/" + file + "/index.html",
        result,
        function() {}
    );
}

fs.readdir(examplesPath, (err, files) => {
    files.forEach(file => {
        if (!file.startsWith(".")) {
            // Create dir and get file code
            fs.ensureDir(dirExamples + file, err => {
                getCode(file);
            });

            buildIndexData(file);
        }
    });

    let source = fs.readFileSync(exampleIndexTemplate, "utf8");
    let template = hb.compile(source);
    let result = template(examplesArr);

    fs.writeFile("./dist/examples.html", result, function() {});
});
