const fs  = require("fs-extra"),
    Prism = require("prismjs"),
    hb    = require("handlebars");

const example = {
    path         : "./docs/examples/",
    template     : "./docs/views/page/example.handlebars",
    indexTemplate: "./docs/views/page/example-index.handlebars",
    dir          : "./dist/examples/",
    array        : []
}

function highlight(lang, sourceCode) {
    const language = Prism.languages[lang] || Prism.languages.autoit;
    return Prism.highlight(sourceCode, language);
}

function buildIndexData(file) {
    example.array.push({
        title: file
    });
}

function getCode(file) {
    const filepath = example.path + file + "/index.html";
    const html = fs.readFileSync(filepath).toString();

    const data = {
        html: html,
        code: highlight("html", html)
    };

    let source   = fs.readFileSync(example.template, "utf8");
    let template = hb.compile(source);
    let result   = template(data);

    fs.writeFile(
        "./dist/examples/" + file + "/index.html",
        result,
        function() {}
    );
}

fs.readdir(example.path, (err, files) => {
    files.forEach(file => {
        if (!file.startsWith(".")) {
            // Create dir and get file code
            fs.ensureDir(example.dir + file, err => {
                getCode(file);
            });

            buildIndexData(file);
        }
    });

    let source   = fs.readFileSync(example.indexTemplate, "utf8");
    let template = hb.compile(source);
    let result   = template(example.array);

    console.log(example.array);

    fs.writeFile("./dist/examples.html", result, function() {});
});
