import { verifyToken } from './jwt.js'
import { COOKIE_NAME } from '../config/auth.config.js'

async function hasSession (req, res, next) {
  try {
    if (req.signedCookies[COOKIE_NAME] === undefined || req.signedCookies[COOKIE_NAME] === false) {
      return res.redirect('/')
    }

    const token = req.signedCookies[COOKIE_NAME]

    await verifyToken(token)

    return next()
  } catch (err) {
    next(err)
  }
}

async function alreadyHasSession (req, res, next) {
  try {
    if (req.signedCookies[COOKIE_NAME] !== undefined && req.signedCookies[COOKIE_NAME] !== false) {
      const token = req.signedCookies[COOKIE_NAME]

      await verifyToken(token)
      return res.redirect('/products')
    }
    return next()
  } catch (err) {
    next(err)
  }
}

export { hasSession, alreadyHasSession }