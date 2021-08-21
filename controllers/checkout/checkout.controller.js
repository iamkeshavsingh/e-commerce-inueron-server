const crypto = require('crypto');
const instance = require("../../config/razorpay.config");

const key_secret = process.env.KEY_SECRET;

function generateSignature(orderId, paymentId) {

    var hmac = crypto.createHmac('sha256', key_secret);
    hmac.update(orderId + '|' + paymentId);
    return hmac.digest('hex');
}


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
        var response = await instance.orders.create({ amount: amount * 100, currency: 'INR' })
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


// TODO: Create a Controller to verify payment
exports.verifyPayment = function (req, res) {
    // razorpay paymenyid, razorpay orderid and razorpay signature
    // For code: https://razorpay.com/docs/payment-gateway/web-integration/standard/#step-5-verify-the-signature
    // verify the signature using generateSignature function
    // When the payment is valid, then we need to empty the cart and push all the items in orders table
}