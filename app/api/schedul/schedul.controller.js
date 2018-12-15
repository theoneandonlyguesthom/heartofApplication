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

exports.addSchedul = function (req, res) {
    var SchedulModel = mongoose.model('Schedul');
    var data = req.body;
    var userData = req.user;
    var html = ' Create schedule on  '+ data.date ;
    var transporter = nodemailer.createTransport('smtps://develapptodate%40gmail.com:0503636776@smtp.gmail.com');
        var mailOptions = {
            from: 'guesthom@gmail.com', // sender address
            to: 'guesthom@gmail.com', // list of receivers
            subject: "New visit request",
            html : html 
        };
    // data.user_id = req.user._id;
   // data.homeamenities = req.body.homeamenities[0];
    SchedulModel.create(data, function (err, user) {
        if (err) {
            res.send(send_response(null, true, err));
        } else {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error + "Error");
                }
            });
            res.send(send_response(null, false, "Schedul Added successfully"));
        }
    });
};


exports.getAllSchedul = function(req,res){
    var SchedulModel = mongoose.model('Schedul');
    var user_id = req.params.uid;
    console.log(user_id);
    SchedulModel.find({"user_id":user_id},function(err,schedulList){
        if(err){
            res.send(send_response(null,true,err));
        } else {
            console.log(schedulList);
            res.send(send_response(schedulList,false,"Succsess"));
        }
    })
}

exports.getById = function (req, res) {
    var Model = mongoose.model(req.params.collection);
    Model.find({ user_id: req.params.user_id }, function (err, annos) {
        if (err) {
            res.send(send_response(null, true, err));
        } else {
            res.send(send_response(annos));
        }
    });
};

exports.destroy = function (req, res) {
    var Model = mongoose.model(req.params.collection);
    Model.findById(req.params.id, function (err, thing) {
        if (err) {
            return res.send(send_response(null, true, err));
        }
        if (!thing) {
            return res.send(send_response(null, true, "Not Found"));
        }
        thing.remove(function (err) {
            if (err) {
                return res.send(send_response(null, true, err));
            }

            res.send(send_response(null,false,"Succsess"));
            // return res.status(204).send(send_response({}));
        });
    });
};