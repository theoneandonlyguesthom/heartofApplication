var _ = require('lodash');
var async = require('async');
var passport = require('passport');
var mongoose = require("mongoose");
var randomstring = require("randomstring");
var nodemailer = require('nodemailer');
var pug = require('pug');
var smtpTransport = require('nodemailer-smtp-transport');
var auth = require('../../auth/auth.service');
var config = require('../../config/local.env');
var request = require("request");
var path = require('path'),
    templatesDir = path.join(__dirname, '../../templates');

exports.addAbout = function (req, res) {
    var AboutModel = mongoose.model('About');
    var data = req.body;
    data.user_id = req.user._id;
   // data.homeamenities = req.body.homeamenities[0];
    AboutModel.create(data, function (err, user) {
        if (err) {
            res.send(send_response(null, true, err));
        } else {
            res.send(send_response(null, true, "About Added successfully"));
        }
    });
};


exports.getAbout = function(req,res){
    var AboutModel = mongoose.model('About');
    AboutModel.find({},function(err,aboutList){
        if(err){
            res.send(send_response(null,true,err));
        } else {
            res.send(send_response(aboutList));
        }
    })
}