const ProductModal = require('../../models/Product.modal')

exports.createProduct = function (req, res) {
    const { name, price } = req.body;
    ProductModal.create({
        name,
        price
    })
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
        })
}


exports.getProducts = function (req, res) {
    ProductModal
        .findAll()
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
        })
}


exports.getProductById = function (req, res) {
    const id = req.params.productId;
    ProductModal
        .findByPk(id)
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
        })
}
