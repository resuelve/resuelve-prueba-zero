const jwt = require('jwt-simple')
const secret = 'ac01afce1b0d46c7f931c183265637de'

exports.validateToken = (req, res, next) => {
  const auth = req.header('Authorization') || ''
  const token = auth.replace('Bearer ', '')
  try {
    req.userData = jwt.decode(token, secret)
    next()
  } catch (e) {
    res.status(403).send('Usuario no autorizado')
  }
}

exports.generateToken = (res, user) => {
  const token = jwt.encode(user, secret)
  return res.header('Authorization', `Bearer ${token}`)
}
