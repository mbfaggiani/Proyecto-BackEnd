import { ProductManagerDB } from '../dao/product.manager.js'
import { CartManagerDB } from '../dao/cart.manager.js'
import { SERVER } from '../config/server.config.js'
import { ROLES } from '../models/user.class.js'
import Handlebars from 'handlebars'
import { verifyToken } from '../middleware/jwt.config.js'

import { COOKIE_NAME } from '../config/config.js'

const RENDER_PATH = {
  CART: 'cart',
  LOGIN: 'login',
  PROFILE: 'profile',
  REGISTER: 'register',
  PRODUCTS: 'products'
}

Handlebars.registerHelper('eq', function (a, b) { return a === b })

async function productsPaginate (req, res, next) {
  try {
    const { products } = await ProductManagerDB.getProducts(req.query)

    const token = req.signedCookies[COOKIE_NAME]

    const userInfo = await verifyToken(token)

    res.status(products.status).render(RENDER_PATH.PRODUCTS, {
      headerTitle: 'Home | Products',
      mainTitle: 'List of products',
      info: products,
      listExist: products.payload.length > 0,
      userCart: userInfo.cartID,
      urlToCart: `${SERVER.BASE_URL}/cart/${userInfo.cartID}`,
      name: `${userInfo.first_name} ${userInfo.last_name}`,
      role: userInfo.role
    })
  } catch (error) {
    return next(error.message)
  }
}

async function cartItems (req, res, next) {
  try {
    const query = req.params.cid
    const myCart = await CartManagerDB.getCartById(query)

    res.status(myCart.status_code).render(RENDER_PATH.CART, {
      headerTitle: 'Home | My cart',
      mainTitle: 'My list of products',
      info: myCart.cart.products,
      listExist: myCart.totalProducts > 0,
      urlToProducts: `${SERVER.BASE_URL}/products`
    })
  } catch (error) {
    return next(error.message)
  }
}

function login (req, res, next) {
  res.status(200).render(RENDER_PATH.LOGIN, {
    headerTitle: 'Log in',
    mainTitle: 'Log in'
  })
}

function register (req, res, next) {
  res.status(200).render(RENDER_PATH.REGISTER, {
    headerTitle: 'Register',
    mainTitle: 'Register',
    roles: Object.values(ROLES)
  })
}

async function profile (req, res, next) {
  const token = req.signedCookies[COOKIE_NAME]

  const userInfo = await verifyToken(token)

  res.status(200).render(RENDER_PATH.PROFILE, {
    headerTitle: 'HOME | Profile',
    mainTitle: 'My Profile',
    userInfo: {
      user: userInfo.email,
      name: `${userInfo.first_name} ${userInfo.last_name}`,
      age: userInfo.age,
      role: userInfo.role
    }
  })
}

export { productsPaginate, cartItems, login, profile, register }