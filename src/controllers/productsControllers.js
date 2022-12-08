const fs = require('fs');

function getAll (req, res) {
    fs.promises.readFile(__dirname + '/../persistencia/dbProducts.txt', 'utf-8')
            .then(file => {
                res.json({allProducts: JSON.parse(file)});
            })
            .catch(err => {
                console.log(err);
            })
}

function getById (req, res) {
    fs.promises.readFile(__dirname + '/../persistencia/dbProducts.txt', 'utf-8')
            .then(file => {
                if (JSON.parse(file).find(el => el.id == req.params.id) == undefined) {
                    res.json({error: 'product not found'})
                }

                JSON.parse(file).find(el => {
                    if (el.id == req.params.id) {
                        res.json({Product: el})
                    }
                })
            })
            .catch(err => {
                console.log(err);
            })
}

function addProduct (req, res) {

    if (!global.admin) {
        return res.send({error: 'descripcion: método addProduct no autorizado'})
    }

    fs.promises.readFile(__dirname + '/../persistencia/dbProducts.txt', 'utf-8')
    .then(file => {
        const products = JSON.parse(file);

        let id = products.length + 1;

        while (products.find(el => el.id == id) != undefined) {
            id++
        }

        products.push({
            id: id,
            ...req.body
        })

        fs.promises.writeFile(__dirname + '/../persistencia/dbProducts.txt', JSON.stringify(products));

        res.json({addedProduct: {id: id, ...req.body} });
    })
    .catch(err => {
        console.log(err);
    })
}

function udpateProduct (req, res) {

    if (!global.admin) {
        return res.send({error: 'descripcion: método addProduct no autorizado'})
    }

    fs.promises.readFile(__dirname + '/../persistencia/dbProducts.txt', 'utf-8')
    .then(file => {
        const products = JSON.parse(file);

        if (products.find(el => el.id == req.params.id) == undefined) {
            res.json({error: 'product not found'})
        }
    
        const previous = products[req.params.id - 1];
        products[req.params.id - 1] = {
            id: products[req.params.id - 1].id,
            ...req.body
        };

        fs.promises.writeFile(__dirname + '/../persistencia/dbProducts.txt', JSON.stringify(products));
    
        res.json({previous: previous, updated: products[req.params.id - 1]});   
    })
    .catch(err => {
        console.log(err);
    })
}

function deleteProduct (req, res) {

    if (!global.admin) {
        return res.send({error: 'descripcion: método addProduct no autorizado'})
    }
    
    fs.promises.readFile(__dirname + '/../persistencia/dbProducts.txt', 'utf-8')
    .then(file => {
        const products = JSON.parse(file);

        if (products.find(el => el.id == req.params.id) == undefined) {
            res.json({error: 'product not found'})
        }
    
        const deletedProduct = products.splice(req.params.id - 1, 1);
    
        fs.promises.writeFile(__dirname + '/../persistencia/dbProducts.txt', JSON.stringify(products));
    
        res.json({deletedProduct: deletedProduct})
    })
    .catch(err => {
        console.log(err);
    })

}

module.exports = {
    getAll,
    getById,
    addProduct,
    udpateProduct,
    deleteProduct
};