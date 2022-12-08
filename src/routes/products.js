const { Router } = require("express");
const { getAll, getById, addProduct, udpateProduct, deleteProduct } = require('../controllers/productsControllers.js');

const productsRouter = Router();

productsRouter.get('/', getAll);
productsRouter.get('/:id', getById);
productsRouter.post('/', addProduct);
productsRouter.put('/:id', udpateProduct);
productsRouter.delete('/:id', deleteProduct);

module.exports = productsRouter;