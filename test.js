var plugin = require('./index.js')
var assert = require('assert')
var describe = require('mocha').describe
var it = require('mocha').it

describe('plugin', function () {
  it('should read frontmatter from the top of the file surrounded by three dashes', function (done) {
    var frontmatter = plugin(JSON.parse)

    frontmatter([{
      file: 'test.txt',
      content: '---\n{ "a-property": "value 1", "another-property": "value 2" }\n---\ntest'
    }], function (err, pages) {
      assert.equal(null, err)
      assert.deepEqual(pages[0], {
        content: 'test',

        file: 'test.txt',

        'a-property': 'value 1',

        'another-property': 'value 2'
      })

      done()
    })
  })

  it('should read frontmatter from the top of the file surrounded by three dashes', function (done) {
    var frontmatter = plugin(function () {
      throw new Error('parse error!')
    })

    frontmatter([{
      file: 'test.txt',
      content: '---\n{ "a-property": "value 1", "another-property": "value 2" }\n---\ntest'
    }], function (err, pages) {
      assert.equal('parse error!', err.message)

      done()
    })
  })

  it('should only read frontmatter', function (done) {
    var frontmatter = plugin(JSON.parse)
    var promises = []

    promises.push(new Promise(function (resolve) {
      frontmatter([{
        file: 'test.txt',
        content: '---\ntest'
      }], function (err, pages) {
        assert.equal(null, err)
        assert.deepEqual(pages[0], {
          content: '---\ntest',

          file: 'test.txt'
        })

        resolve()
      })
    }))

    promises.push(new Promise(function (resolve) {
      frontmatter([{
        file: 'test.txt',
        content: 'test'
      }], function (err, pages) {
        assert.equal(null, err)
        assert.deepEqual(pages[0], {
          content: 'test',

          file: 'test.txt'
        })

        resolve()
      })
    }))

    Promise.all(promises).then(function () { done() })
  })
})
