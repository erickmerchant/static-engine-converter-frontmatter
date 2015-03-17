var frontmatter = require('../index.js')();
var assert = require('assert');

describe('plugin', function(){

    it('should read yaml frontmatter from the top of the file surrounded by three dashes', function(done){

        frontmatter([{
            file: 'test.txt',
            content: "---\na-property: value 1\nanother-property: value 2\n---\ntest"
        }], function(err, pages){

            try
            {
                assert.deepEqual(pages[0], {

                    content: "test",

                    file: "test.txt",

                    'a-property': 'value 1',

                    'another-property': 'value 2'
                });

                done();
            }
            catch(err) {

                done(err);
            }
        });
    });
});
