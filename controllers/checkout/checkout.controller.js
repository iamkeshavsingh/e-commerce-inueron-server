const instance = require("../../config/razorpay.config");

exports.checkout = async function (req, res) {
    try {
        // TODO: Instead of amount take the product id and calculate the price on the server and to rely on the price you are getting from the client
        var { amount } = req.body;
        if (!amount) return res.status(400).json({
            success: false
        })
        //TODO: Make sure to add this order_id in the database as well
        /*    
            {
                id: 1,
                paid: false,
                order_id: order_id
            }
        
        */
        var response = await instance.orders.create({ amount: amount, currency: 'INR' })
        res.json({
            order_id: response.id,
            currency: response.currency,
            id: 1
        })
    }
    catch (err) {
        console.log(err)
    }
}