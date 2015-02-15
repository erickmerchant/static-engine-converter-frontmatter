var yaml = require('js-yaml');
var delim = "---\n";
var assign = require('object-assign');

module.exports = function(converter) {

    if(typeof converter == 'undefined') {

        converter = function(content) {

            return yaml.load(content);
        }
    }

    return function (page, done) {

        var content = page.content;

        var frontmatter;

        try {

            content = content.split(delim);

            if(content.length > 1) {

                frontmatter = converter(content[1]);

                page = assign(page, frontmatter);

                content = content.slice(2);
            }

            page.content = content.join(delim);

            done(null, page);
        }
        catch(e) {

            done(e);
        }
    };
};
