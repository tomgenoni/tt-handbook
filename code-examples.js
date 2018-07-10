const fs = require("fs"),
    Prism = require("prismjs"),
    jsdom = require("jsdom"),
    cheerio = require("cheerio"),
    { JSDOM } = jsdom;

const examplesPath = "./dist/examples/";

function highlight(lang, sourceCode) {
    const language = Prism.languages[lang] || Prism.languages.autoit;
    return Prism.highlight(sourceCode, language);
}

function getCode(file) {
    const filepath = examplesPath + file + "/index.html";
    const html = fs.readFileSync(filepath).toString();

    const dom = new JSDOM(html);
    const example = dom.window.document.querySelector("#example").innerHTML;
    const code = highlight("html", example);
    const pre = `<div class="tp-wrap mv5"><pre><code>${code}</code></pre></div>`;

    const $ = cheerio.load(html);
    $("body").append(pre);

    fs.writeFile(filepath, $.html(), function() {});
}

fs.readdir(examplesPath, (err, files) => {
    files.forEach(file => {
        if (!file.startsWith(".")) {
            getCode(file);
        }
    });
});
