var gulp           = require('gulp'),
    data           = require('gulp-data'),
    rename         = require('gulp-rename'),
    content        = require('./data/data.json')
    nunjucksRender = require('gulp-nunjucks-render');


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

        // var pages = [
        //     {
        //         title: 'foo',
        //         filename: 'bar'
        //     }
        // ]

        // Sub index files
        content.items.forEach(function(item){
            var currCategory = item.fields.category;

            if ( item.sys.contentType.sys.id == 'index' && category == currCategory) {

                gulp.src('templates/index.nj')
                   .pipe(data(function(file) {
                        return {
                           'fields': item.fields,
                           'links': pages
                        }
                   }))
                   .pipe(nunjucksRender())
                   .pipe(rename('index.html'))
                   .pipe(gulp.dest('./dist/' + filename(category)));

            }

            // Pages within section
            if ( item.sys.contentType.sys.id == 'page' && category == currCategory) {

                gulp.src('templates/page.nj')
                   .pipe(data(function(file) {
                       return { 'data': item.fields }
                   }))
                   .pipe(nunjucksRender())
                   .pipe(rename(filename(item.fields.title) + '.html'))
                   .pipe(gulp.dest('./dist/' + filename(category)));

            }
        });
    })

});
