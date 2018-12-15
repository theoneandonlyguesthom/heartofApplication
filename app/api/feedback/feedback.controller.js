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

exports.addFeedback = function (req, res) {
    var FeedbackModel = mongoose.model('Feedback');
    var data = req.body;
    data.user_id = req.user._id;
   // data.homeamenities = req.body.homeamenities[0];
    FeedbackModel.create(data, function (err, user) {
        if (err) {
            res.send(send_response(null, true, err));
        } else {
            res.send(send_response(null, true, "Feedback Added successfully"));
        }
    });
};


exports.getFeedback = function(req,res){
    var FeedbackModel = mongoose.model('Feedback');
    FeedbackModel.find({},function(err,feddbackList){
        if(err){
            res.send(send_response(null,true,err));
        } else {
            res.send(send_response(feddbackList));
        }
    })
}