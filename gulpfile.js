var gulp           = require('gulp'),
    nunjucks       = require('nunjucks'),
    markdown       = require('nunjucks-markdown'),
    marked         = require('marked'),
    gulpnunjucks   = require('gulp-nunjucks'),
    data           = require('gulp-data'),
    rename         = require('gulp-rename'),
    content        = require('./data/data.json');

// Markdown stuff
var templates = '/templates';
var env = new nunjucks.Environment(new nunjucks.FileSystemLoader(templates));
markdown.register(env, marked);

marked.setOptions({
    renderer: new marked.Renderer(),
    sanitize: true
});

function dedupe(arr) {
    return deduped = arr.filter( (el, i, arr) => arr.indexOf(el) === i);
}

function filename(name) {
    var e = name.toLowerCase();
    e = e.replace(' ','-');
    return e;
}

gulp.task('build', function() {
    var categories = [];

    content.items.forEach(function(item){
        var category = item.fields.category;
        if (category) {
            categories.push(category)
        }
    });

    categories = dedupe(categories);

    // Build the index file
    var indexContent = [];
    var indexLinks = [];

    content.items.forEach(function(item){
        if ( !item.fields.category) {
            indexContent = {
                title: item.fields.title,
                introText: item.fields.introText
            }
        }

        if ( item.sys.contentType.sys.id == 'index' && item.fields.category) {
            indexLinks.push({
                title: item.fields.title,
                filename: filename(item.fields.title)
            })
        }
    });

    gulp.src('templates/root.nj')
       .pipe(data(function(file) {
            return {
               'fields': indexContent,
               'links': indexLinks
            }
       }))
       .pipe(gulpnunjucks.compile("", {env: env}))
       .pipe(rename('index.html'))
       .pipe(gulp.dest('./dist/'));


    categories.forEach(function(category){
        var pages = [];

        // Collect page titles in the category
        content.items.forEach(function(item){
            var currCategory = item.fields.category;
            if ( item.sys.contentType.sys.id == 'page' && category == currCategory) {
                pages.push({
                    title: item.fields.title,
                    filename: filename(item.fields.title)
                })
            }
        })

        // Sub index files
        content.items.forEach(function(item){
            var currCategory = item.fields.category;

            if ( item.sys.contentType.sys.id == 'index' && category == currCategory) {

                gulp.src('templates/index.nj')
                   .pipe(data(function(file) {
                        return {
                           'fields': item.fields,
                           'category': filename(item.fields.category),
                           'links': pages
                        }
                   }))
                   .pipe(gulpnunjucks.compile("", {env: env}))
                   .pipe(rename('index.html'))
                   .pipe(gulp.dest('./dist/' + filename(category)));

            }

            // Pages within section
            if ( item.sys.contentType.sys.id == 'page' && category == currCategory) {

                gulp.src('templates/page.nj')
                   .pipe(data(function(file) {
                       return { 'data': item.fields }
                   }))
                   .pipe(gulpnunjucks.compile("", {env: env}))
                   .pipe(rename(filename(item.fields.title) + '.html'))
                   .pipe(gulp.dest('./dist/' + filename(category)));

            }
        });
    })

});
