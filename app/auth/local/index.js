'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router.post('/', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        var error = err || info;
        if (error)
            return res.status(200).json(send_response(null, true, error.message));
        if (!user)
            return res.status(404).json(send_response(null, true, 'Login info is incorrect please try valid data'));

        var token = auth.signToken(user._id, user.role);
        //res.json({token: token});
        if(user.status === false){
            return res.status(200).json(send_response(null, false, "otp"));
        } else {
            var data = {user: user, access_token: token};
            res.json({data: data, is_error: false, message: 'Login successfully'}); // login successfully
        }
    })(req, res, next)
});

module.exports = router;