# static-engine-converter-frontmatter

[![Dependency Status](https://david-dm.org/erickmerchant/static-engine-converter-frontmatter.svg?style=flat-square)](https://david-dm.org/erickmerchant/static-engine-converter-frontmatter) [![devDependency Status](https://david-dm.org/erickmerchant/static-engine-converter-frontmatter/dev-status.svg?style=flat-square)](https://david-dm.org/erickmerchant/static-engine-converter-frontmatter#info=devDependencies) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

This is a plugin for [static-engine](https://github.com/erickmerchant/static-engine). Traverses every object in the array and extracts frontmatter from the __content__ property. Call it with a converter for the frontmatter, something like JSON.parse, and then optionially a delimiter. By default the delimiter is `---`; The properties of the frontmatter are assigned to the object, and the frontmatter along with the delims is removed from the content.

```javascript

var engine = require('static-engine');
var frontmatter = require('static-engine-converter-frontmatter');
var pluginA = require('plugin-a');
var cson = require('cson-parser');

engine([
    pluginA,
    frontmatter(cson.parse)
]);

```
