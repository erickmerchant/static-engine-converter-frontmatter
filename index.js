var yaml = require('js-yaml');
var delim = "---\n";
var assign = require('object-assign');

module.exports = function () {

    return function (file, page, next) {

        var content = page.content;

        content = content.split(delim);

        if(content.length > 1) {

            page = assign(page, yaml.load(content[1]));

            content = content.slice(2);
        }

        page.content = content.join(delim);

        return next(file, page);
    };
};
