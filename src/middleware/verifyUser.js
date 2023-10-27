const JWT = require('jsonwebtoken')
require('dotenv/config')

module.exports = (req, res, next) => {
  const bearer = req.headers.authorization
  if ( typeof bearer === 'undefined' )
    return res.status(401).send('Bearer is missing in headers')

  const token = bearer.replace('Bearer ', '')
  JWT.verify(token, process.env.SECRET, (err, data) => {
    if ( err )
      return res.status(403).send('No access')

    req.user = data
    next()
  })
}