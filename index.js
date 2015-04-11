var assign = require('object-assign')

module.exports = function (converter, delim) {
  delim = delim || '---'

  return function (pages, done) {
    try {
      pages.forEach(function (page) {
        var content = page.content

        var frontmatter

        content = content.split(delim).map(function (v) {
          return v.trim()
        })

        if (content.length > 1) {
          frontmatter = converter(content[1])

          page = assign(page, frontmatter)

          content = content.slice(2)
        }

        page.content = content.join(delim)
      })

      done(null, pages)
    } catch(e) {
      done(e)
    }
  }
}
