import jwt from 'jsonwebtoken'

import { JWT_PRIVATE_KEY } from '../config/auth.config.js'

function generateToken (user) {
  const payload = JSON.parse(JSON.stringify(user))

  const token = jwt.sign(payload, JWT_PRIVATE_KEY, { expiresIn: '1h' })

  return token
}

function verifyToken (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_PRIVATE_KEY, (err, decodedPayload) => {
      if (err) {
        reject(err)
      } else {
        resolve(decodedPayload)
      }
    })
  })
}

export {
  generateToken,
  verifyToken
}