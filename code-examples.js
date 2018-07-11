const fs = require("fs-extra"),
    Prism = require("prismjs"),
    hb = require("handlebars");

const examplesPath = "./docs/examples/";
const exampleTemplate = "./docs/views/example.handlebars";
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

    let source = fs.readFileSync(exampleTemplate, "utf8");
    let template = hb.compile(source);
    let result = template(data);

    fs.writeFile(
        "./dist/examples/" + file + "/index.html",
        result,
        function() {}
    );
}

// Move the index.html
fs.copy("./docs/examples.html", "./dist/examples.html");

fs.readdir(examplesPath, (err, files) => {
    files.forEach(file => {
        if (!file.startsWith(".")) {
            fs.ensureDir(dirExamples + file, err => {
                getCode(file);
            });
        }
    });
});
