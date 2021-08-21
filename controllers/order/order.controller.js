const CartModal = require('../../models/Cart.modal')
const OrderModal = require('../../models/Order.modal')
const sequelize = require('../../config/db.config')

exports.placeOrder = async (req, res) => {

    var userId = req.user.id;

    function mapper(item) {
        item = item.toJSON();
        return {
            quantity: item.quantity,
            price: item.price,
            UserId: item.UserId,
            ProductId: item.ProductId
        };
    }

    // sequelize.transaction(async (t) => {

    //     try {
    //         var cartResponse = await CartModal.findAll({ where: { UserId: userId }, transaction: t });
    //         await CartModal.destroy({ where: { UserId: userId }, transaction: t });
    //         var items = cartResponse.map(mapper)
    //         await OrderModal.create(items, { transaction: t })
    //         return res.json(items)
    //     }
    //     catch (err) { console.log(err) }
    // });

    var t = await sequelize.transaction();

    // Unmanaged Transaction
    try {
        var cartResponse = await CartModal.findAll({ where: { UserId: userId } });
        await CartModal.destroy({ where: { UserId: userId }, transaction: t });
        var items = cartResponse.map(mapper)
        await OrderMod.create(items, { transaction: t })
        await t.commit();
        return res.json(items)
    }
    catch (err) {
        console.log(err)
            (await t.rollback());
    }

};


exports.getOrders = (req, res) => {
    var userId = req.user.id;
    OrderModal.findAll({ where: { UserId: userId } })
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
        })
}