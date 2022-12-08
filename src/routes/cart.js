const { Router } = require("express");
const { createCart, deleteCart, viewCart, addToCart, deleteProduct } = require('../controllers/cartControllers.js');

const cartRouter = Router();

cartRouter.post('/', createCart);
cartRouter.delete('/:id', deleteCart);
cartRouter.get('/:id/productos', viewCart);
cartRouter.post('/:id/productos/:idProduct', addToCart);
cartRouter.delete('/:id/productos/:idProduct', deleteProduct);

module.exports = cartRouter;