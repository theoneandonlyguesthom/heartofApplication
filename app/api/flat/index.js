'use strict';

var express = require('express');
var controller = require('./flat.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.post('/addFlat', auth.isAuthenticated(), controller.addFlat);
router.get('/getAllFlats', auth.isAuthenticated(), controller.getAllFlats);
router.get('/getFlatForHomePage', controller.getFlatForHomePage);
router.post('/UpdateFlat', auth.isAuthenticated(), controller.UpdateFlat);
router.get('/getById/:owner_id', controller.getById);
router.get('/getByIdPanding/:owner_id', controller.getByIdPanding);
router.get('/getByIdPandingActive/:owner_id', controller.getByIdPandingActive);
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