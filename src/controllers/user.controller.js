import { userManagerDB } from "../dao/user.manager.js";
import Carts from "../entidades/carts.js";
import Users from "../entidades/users.js";
import { CartManagerDB } from "../dao/cart.manager.js";
import { encriptarJWT } from "../utils/criptografia.js";

export async function getUsersController(req, res, next) {
  const users = await userManagerDB.findUsers();
  res.json(users);
}

export async function postUsuarios(req, res, next) {
    try {
      const newcart = new Carts();
      const cart = await CartManagerDB.addCart(newcart);
      req.session.cart = cart._id;
      const user = {
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        age: req.body.age,
        password: req.body.password,
        role:
          req.body.email === "adminCoder@coder.com" &&
          req.body.password === "adminCod3r123"
            ? "admin"
            : req.body.email === "joaquin.bidart@blackid.app" &&
              req.body.password === "blackastro"
            ? "super-admin"
            : undefined,
        cart: cart.id,
      };
  
      const newusr = new Users(user);
      const userCreated = await userManagerDB.addUser(newusr.datos());
      const objusr = JSON.parse(JSON.stringify(userCreated));
  
      res.cookie("jwt_authorization", encriptarJWT(objusr), {
        signed: true,
        httpOnly: true,
      });
  
      res.status(201).json(objusr);
    } catch (error) {
      await CartManagerDB.deleteCart(req.session.cart);
      next(error);
    }
  }