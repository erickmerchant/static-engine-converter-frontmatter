var assign = require('object-assign')

module.exports = function (converter, delim) {
  delim = delim || '---\n'

  return function (pages, done) {
    try {
      pages.forEach(function (page) {
        var content = page.content

        var frontmatter

        if (content.startsWith(delim)) {
          content = content.split(delim).map(function (v) {
            return v.trim()
          })

          if (content.length > 2) {
            frontmatter = converter(content[1])

            page = assign(page, frontmatter)

            content = content.slice(2)
          }

          page.content = content.join(delim)
        }
      })

      done(null, pages)
    } catch(e) {
      done(e)
    }
  }
}
