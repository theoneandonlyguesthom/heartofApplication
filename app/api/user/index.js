'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/register', controller.register);
router.post('/getreceviers', auth.isAuthenticated(), controller.GetUserReceviers);
router.post('/addreceviers', auth.isAuthenticated(), controller.AddUserReceviers);
router.post('/updaterecevier', auth.isAuthenticated(), controller.UpdateUserReceviers);
router.post('/getpayments', auth.isAuthenticated(), controller.GetUserPayments);
router.post('/forgotpassword', controller.forgotpassword);
router.get('/resetpassword/:uid', controller.resetpassword);
router.post('/passwordresetrequest', controller.passwordresetrequest);
router.post('/passwordreset', controller.passwordreset);
router.post('/resetpasswordsubmit', controller.resetpasswordsubmit);
router.get('/password_success', controller.password_success);
router.post('/getusersbyadmin', auth.isAuthenticated(), controller.getuserbyadmin);
router.post('/geterrorlog',controller.geterrorlog);
router.get('/getAllUsers',auth.isAuthenticated(),controller.getAllUsersList);
router.get('/getAreaList',controller.getAreaList);
router.post('/sendOtp',controller.sendOtp);
router.post('/verifyOtp',controller.verifyOtp);
router.get('/testSms',controller.testSms);

module.exports = router;