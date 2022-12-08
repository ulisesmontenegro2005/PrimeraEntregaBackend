const { Router } = require("express");
const cartRouter = require("./cart");
const productsRouter = require("./products");

const router = Router();

router.use('/productos', productsRouter);
router.use('/carrito', cartRouter);

module.exports = router;