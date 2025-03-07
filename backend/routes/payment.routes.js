const express = require("express");
const router = express.Router();
const paymentcontroller=require('../controllers/payment.controller');

router.post('/order',paymentcontroller.createorder);
router.post('/validate',paymentcontroller.validatepayment);



module.exports = router;