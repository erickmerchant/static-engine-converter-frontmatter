var frontmatter = require('../index.js');
var assert = require('chai').assert;

describe('plugin', function(){

    it('should read yaml frontmatter from the top of the file surrounded by three dashes', function(done){

        frontmatter({
            file: 'test.txt',
            content: "---\na-property: value 1\nanother-property: value 2\n---\ntest"
        }).then(function(page){

            assert.deepEqual(page.content, "test");

            assert.deepEqual(page['a-property'], 'value 1');

            assert.deepEqual(page['another-property'], 'value 2');

            done();
        });
    });
});
