var yaml = require('js-yaml');
var delim = "---\n";
var assign = require('object-assign');

module.exports = function(converter) {

    if(typeof converter == 'undefined') {

        converter = function(content) {

            return yaml.load(content);
        }
    }

    return function (pages, done) {

        try {

            pages.forEach(function(page){

                var content = page.content;

                var frontmatter;

                content = content.split(delim);

                if(content.length > 1) {

                    frontmatter = converter(content[1]);

                    page = assign(page, frontmatter);

                    content = content.slice(2);
                }

                page.content = content.join(delim);
            });

            done(null, pages);
        }
        catch(e) {

            done(e);
        }
    };
};
