import Razorpay from 'razorpay';
import crypto from 'crypto';
 const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
  });

export const checkout = async (req,res)=>{
  const options = {
    amount:Number(req.body.amount*100),  
    currency: "INR"
  };
  const order = await instance.orders.create(options)
  res.status(200).json({
    order,
    success: true,
  })
}
export const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_KEY);
  hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const generated_signature = hmac.digest('hex');
  if (generated_signature === razorpay_signature) {
    res.status(200).json({ success: true, message: "Payment verified successfully" });
  } else {
    res.status(400).json({ success: false, message: "Payment verification failed" });
  }
};