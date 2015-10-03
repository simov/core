
var zlib = require('zlib')


function gzip (req, options) {
  options.headers.set('accept-encoding', 'gzip, deflate')

  req.on('response', function (res) {
    if (req._redirect) return

    var encoding
    if (/gzip|deflate/.test(options.gzip)) {
      encoding = options.gzip
    }
    else {
      encoding = res.headers.get('content-encoding') || 'identity'
    }

    var decompress
    if (encoding.match(/\bdeflate\b/)) {
      decompress = zlib.createInflate()
    }
    else if (encoding.match(/\bgzip\b/)) {
      decompress = zlib.createGunzip()
    }

    if (decompress) {
      req._res = req._res.pipe(decompress)
    }
  })
}

module.exports = gzip