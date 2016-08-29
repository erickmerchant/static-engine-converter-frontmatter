var plugin = require('./index.js')
var test = require('tape')

test('should read frontmatter from the top of the file surrounded by three dashes', function (t) {
  var frontmatter = plugin(JSON.parse)

  frontmatter([{
    file: 'test.txt',
    content: '---\n{ "a-property": "value 1", "another-property": "value 2" }\n---\ntest'
  }], function (err, pages) {
    t.equal(null, err)
    t.deepEqual(pages[0], {
      content: 'test',

      file: 'test.txt',

      'a-property': 'value 1',

      'another-property': 'value 2'
    })

    t.end()
  })
})

test('should read frontmatter from the top of the file surrounded by three dashes', function (t) {
  var frontmatter = plugin(function () {
    throw new Error('parse error!')
  })

  frontmatter([{
    file: 'test.txt',
    content: '---\n{ "a-property": "value 1", "another-property": "value 2" }\n---\ntest'
  }], function (err, pages) {
    t.equal('parse error!', err.message)

    t.end()
  })
})

test('should only read frontmatter', function (t) {
  var frontmatter = plugin(JSON.parse)
  var promises = []

  promises.push(new Promise(function (resolve) {
    frontmatter([{
      file: 'test.txt',
      content: '---\ntest'
    }], function (err, pages) {
      t.equal(null, err)
      t.deepEqual(pages[0], {
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
      t.equal(null, err)
      t.deepEqual(pages[0], {
        content: 'test',

        file: 'test.txt'
      })

      resolve()
    })
  }))

  Promise.all(promises).then(function () { t.end() })
})
