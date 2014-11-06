var frontmatter = require('../index.js')();
var assert = require('chai').assert;

describe('plugin', function(){

    it('should add certain properties to the page object based on the file name', function(done){

        frontmatter('test.txt', {
            content: "---\na-property: value 1\nanother-property: value 2\n---\ntest"
        }, function(file, page, next){

            assert.deepEqual(page.content, "test");

            assert.deepEqual(page['a-property'], 'value 1');

            assert.deepEqual(page['another-property'], 'value 2');

            done();
        });
    });
});
