const fs = require('fs')

function createCart (req, res) {
    fs.promises.readFile(__dirname + '/../persistencia/dbCarts.txt', 'utf-8')
    .then(file => {
        const carts = JSON.parse(file);

        let id = carts.length + 1;

        let newCart = {
            id: id,
            timestamp: Date.now(),
            products: []
        }

        carts.push(newCart);

        fs.promises.writeFile(__dirname + '/../persistencia/dbCarts.txt', JSON.stringify(carts));

        res.json({createdCart: newCart})
    })
    .catch(err => {
        console.log(err);
    })
}

function deleteCart (req, res) {
    fs.promises.readFile(__dirname + '/../persistencia/dbCarts.txt', 'utf-8')
    .then(file => {
        let carts = JSON.parse(file);

        carts = carts.filter(cart => cart.id != req.params.id);

        fs.promises.writeFile(__dirname + '/../persistencia/dbCarts.txt', JSON.stringify(carts));

        res.json({cartsView: {deletedCartId: req.params.id, carts: carts}})
    })
    .catch(err => {
        console.log(err);
    })
}

function viewCart (req, res) {
    fs.promises.readFile(__dirname + '/../persistencia/dbCarts.txt', 'utf-8')
    .then(file => {
        const carts = JSON.parse(file);

        if (carts.find(cart => cart.id == req.params.id) == undefined) {
            res.json({error: 'product not founded'})
        }

        const cartView = carts.find(cart => cart.id == req.params.id)

        res.json({cartProductsView: cartView.products})
    })
    .catch(err => {
        console.log(err);
    })
}

function addToCart (req, res) {
    fs.promises.readFile(__dirname + '/../persistencia/dbCarts.txt', 'utf-8')
    .then( file => {

        const carts = JSON.parse(file);

        const cart = carts.find(cart => cart.id == req.params.id).products;

        fs.readFile('dbProducts.txt', 'utf-8', (err, data) => {
            if ((JSON.parse(data).find(prod => prod.id == req.params.idProduct) == undefined)) {
                res.json({error: 'product not found'})
            }

            const product = JSON.parse(data).find(prod => prod.id == req.params.idProduct);

            cart.push(product);

            fs.promises.writeFile(__dirname + '/../persistencia/dbCarts.txt', JSON.stringify(carts));

            res.json({cartProductsView: cart})
        });

    })
    .catch(err => {
        console.log(err);
    })
}

function deleteProduct (req, res) {
    fs.promises.readFile(__dirname + '/../persistencia/dbCarts.txt', 'utf-8')
    .then(file => {
        let carts = JSON.parse(file);

        let cartProducts = carts.find(cart => cart.id == req.params.id).products;

        carts = carts.filter(carts => carts.id != req.params.id);

        cartProducts = cartProducts.filter(prod => prod.id != req.params.idProduct);

        carts.push({
            id: parseInt(req.params.id),
            timestamp: Date.now(),
            products: cartProducts
        });

        fs.promises.writeFile(__dirname + '/../persistencia/dbCarts.txt', JSON.stringify(carts));

        res.json({cartView: carts.find(cart => req.params.id == cart.id)})
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = {
    createCart,
    deleteCart,
    viewCart,
    addToCart,
    deleteProduct
}