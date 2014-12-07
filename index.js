var yaml = require('js-yaml');
var delim = "---\n";
var assign = require('object-assign');
var Promise = require('es6-promise').Promise;

module.exports = function (page) {

    return new Promise(function(resolve, reject) {

        var content = page.content;

        content = content.split(delim);

        if(content.length > 1) {

            page = assign(page, yaml.load(content[1]));

            content = content.slice(2);
        }

        page.content = content.join(delim);

        resolve(page);
    });
};
