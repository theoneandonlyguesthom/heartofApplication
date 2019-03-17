'use strict';

var express = require('express');
var controller = require('./feedback.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.post('/addFeedback', auth.isAuthenticated(), controller.addFeedback);
router.get('/getFeedback', auth.isAuthenticated(), controller.getFeedback);
router.post('/addMessage', controller.addMessage);
router.get('/getMessages', controller.getMessages);
router.post('/addNewslatter', controller.addNewslatter);
router.get('/getNewslatter', controller.getNewslatter);
// router.post('/send_payment', auth.isAuthenticated(), controller.SendPayment);
// router.post('/directdebituserlist', auth.isAuthenticated(), controller.DirectDebitUserList);
// router.post('/gettotalpayments', auth.isAuthenticated(), controller.GetTotalPayments);
// router.post('/addcronjob', controller.addcronjob);
// router.post('/paymentsuccess', controller.payment_success);
// router.get('/lastpayment', controller.last_payment);
// router.post('/paymentfail', controller.payment_fails);
// router.patch('/updatepaymentstatus', controller.UpdatePaymentStatus);
// router.post('/getpaymentstatusreport', controller.GetPaymentStatusReport);

module.exports = router;