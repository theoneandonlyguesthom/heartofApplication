'use strict';

var express = require('express');
var controller = require('./pg.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.post('/addPg', auth.isAuthenticated(), controller.addPg);
router.get('/getAllPgs', auth.isAuthenticated(), controller.getAllPgs);
router.get('/getAllPgswithoutlogin', controller.getAllPgs);
router.get('/getHomeListByGender/:whom',controller.getHomeListByGender);
router.get('/getHomeListByArea/:area',controller.getHomeListByArea);
router.get('/getFilteredItem/:price/:tenantType',controller.getFilteredItem);
router.post('/UpdatePg', auth.isAuthenticated(), controller.UpdatePg);

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