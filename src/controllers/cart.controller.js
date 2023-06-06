import { CartManagerDB } from '../dao/cart.manager.js'

const updateCartProducts = async (req, res, next) => {
  try {
    const query = {
      cartID: req.params.cid,
      productID: req.params.pid,
      quantityValue: req.body?.quantity ?? null
    }
    const { operationDetails, status_code } = await CartManagerDB.addProductToCart(query)
    res
      .status(status_code)
      .json({ details: operationDetails })
  } catch (error) {
    next(error.message)
  }
}

const getCart = async (req, res, next) => {
  try {
    const query = req.params.cid
    const { cart, status_code, totalProducts } = await CartManagerDB.getCartById(query)
    res
      .status(status_code)
      .json({ cart, totalProducts })
  } catch (error) {
    next(error.message)
  }
}

const clearCartProducts = async (req, res, next) => {
  try {
    const query = req.params.cid
    const { cartUpdated, status_code } = await CartManagerDB.deleteAllCartProducts(query)
    res
      .status(status_code)
      .json(cartUpdated)
  } catch (error) {
    next(error.message)
  }
}

const createNewCart = async (req, res, next) => {
  try {
    const { cart, status_code } = await CartManagerDB.createCart()
    res
      .status(status_code)
      .json(cart)
  } catch (error) {
    next(error.message)
  }
}

const getAllCarts = async (req, res, next) => {
  try {
    const { carts, status_code } = await CartManagerDB.getCarts()
    res
      .status(status_code)
      .json(carts)
  } catch (error) {
    next(error.message)
  }
}

const deleteCartProduct = async (req, res, next) => {
  try {
    const query = {
      cartID: req.params.cid,
      productID: req.params.pid
    }
    const { details, status_code } = await CartManagerDB.deleteCartProduct(query)
    res
      .status(status_code)
      .json(details)
  } catch (error) {
    next(error.message)
  }
}

export {
  updateCartProducts,
  getCart,
  clearCartProducts,
  createNewCart,
  getAllCarts,
  deleteCartProduct
}