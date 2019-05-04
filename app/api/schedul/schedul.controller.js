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
const sgMail = require('@sendgrid/mail');

exports.addSchedul = function (req, res) {
    var SchedulModel = mongoose.model('Schedul');
    var data = req.body;
    var userData = req.user;
    var html = ' Create schedule on  '+ data.date ;
    var mailData = {userName: '', userMobile: '', ownerName: '', ownerMobile: '', PGName: '', areaName: '', onDate: ''};
    
    SchedulModel.create(data, function (err, user) {
        console.log(user);
        if (err) {
            res.send(send_response(null, true, err));
        } else {
            var UserModel = mongoose.model('User');
            async.parallel([
                function(callback){
                    UserModel.findById(req.body.user_id, function (err, userData) {
                        if(err){
                            callback(null,err);
                        } else {
                            mailData.userName = userData.first_name;
                            mailData.userMobile = userData.phone_number;    
                            callback(null,userData);
                        }
                    })
                },function(callback){
                    UserModel.findById(req.body.owner_id, function (err, OwnerData) {
                        if(err){
                            callback(null,err);
                        } else {
                            mailData.ownerName = OwnerData.first_name;
                            mailData.ownerMobile = OwnerData.phone_number;
                            callback(null,OwnerData);
                        }
                        
                    })
                }
            ],function(error,result){
                if(error){
                    res.send(send_response(null,true,error)); 
                } else {
                    mailData.PGName = req.body.name;
                    mailData.areaName = req.body.area;
                    mailData.onDate = req.body.date;

                    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                    const mailOptions = {
                    to: 'guesthom@gmail.com',
                    from: 'ndsnaren@gmail.com',
                    subject: 'New home visit request',
                    text: "New Home visit request",
                    html: '<strong>' + mailData.userName + ' ( ' + mailData.userMobile + ' ) Booked visit for '+ mailData.ownerName + ' ( ' + mailData.ownerMobile + ' )`s '+ mailData.areaName + ' area`s '+ mailData.PGName + 'PG On ' + mailData.onDate + '</strong>',
                    };
                    sgMail.send(mailOptions, function (error, info) {
                        if (error) {
                            console.log("Error in Schedule's mail send");
                        } else {
                            console.log("Schedule email sent successfully");
                        }
                    });
                    console.log(mailData);
                    res.send(send_response(null, false, "Schedul Added successfully"));
                }
            })
            
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