const fs = require("fs"),
    Prism = require("prismjs"),
    hb = require("handlebars"),
    ncp = require("ncp").ncp;

const examplesPath = "./docs/examples/";
const dirExamples = "./dist/examples/";

function highlight(lang, sourceCode) {
    const language = Prism.languages[lang] || Prism.languages.autoit;
    return Prism.highlight(sourceCode, language);
}

function getCode(file) {
    const filepath = examplesPath + file + "/index.html";
    const html = fs.readFileSync(filepath).toString();

    const data = {
        html: html,
        code: highlight("html", html)
    };

    let source = fs.readFileSync("./docs/views/example.handlebars", "utf8");
    let template = hb.compile(source);
    let result = template(data);

    fs.writeFile(
        "./dist/examples/" + file + "/index.html",
        result,
        function() {}
    );
}

if (!fs.existsSync(dirExamples)) {
    fs.mkdirSync(dirExamples);
}

// Move the index.html
ncp("./docs/examples.html", "./dist/examples.html");

fs.readdir(examplesPath, (err, files) => {
    files.forEach(file => {
        if (!file.startsWith(".")) {
            if (!fs.existsSync(dirExamples + file)) {
                fs.mkdirSync(dirExamples + file);
            }
            getCode(file);
        }
    });
});
