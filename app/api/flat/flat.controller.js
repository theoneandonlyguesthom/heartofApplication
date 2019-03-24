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

exports.addFlat = function (req, res) {
    var FlatModel = mongoose.model('Flat');
    var data = req.body;
    var userData = req.user;
    data.owner_id = userData._id;
    var html = userData.first_name + ' ' + userData.last_name +  ' Added new flate in '+ data.area + ' area';
    var transporter = nodemailer.createTransport("smtps://guesthom%40gmail.com:"+encodeURIComponent('LenovoDolby1') + "@smtp.gmail.com:465");
        var mailOptions = {
            from: 'guesthom@gmail.com', // sender address
            to: 'guesthom@gmail.com', // list of receivers
            subject: "New flat request",
            html : html 
        };
    FlatModel.create(data, function (err, user) {
        if (err) {
            res.send(send_response(null, true, err));
        } else {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error + "Error");
                }
            });
            res.send(send_response(null, true, "Flat Added successfully"));
        }
    });
};

exports.getById = function (req, res) {
    var Model = mongoose.model('Flat');
    Model.find({ owner_id: req.params.owner_id,status:true }, function (err, annos) {
        if (err) {
            res.send(send_response(null, true, err));
        } else {
            res.send(send_response(annos));
        }
    });
};

exports.getByIdPanding1 = function (req, res) {
    var Model = mongoose.model('Flat');
    Model.find({ owner_id: req.params.owner_id,status:false }, function (err, annos) {
        if (err) {
            res.send(send_response(null, true, err));
        } else {
            res.send(send_response(annos));
        }
    });
};


exports.getByIdPandingActive = function(req,res){
    var PgModel = mongoose.model('Pg');
    var FlatModel = mongoose.model('Flat');
    var whom = req.params.whom;
    var areaListArry = [];

    async.waterfall([
        function(callback){
            FlatModel.find({owner_id: req.params.owner_id, status:true},function(err,areaListFlat){
                if(err){
                    callback(null,err);
                } else {
                    areaListFlat.forEach(function(item) { 
                        areaListArry.push(item);
                    })
                    callback(null,areaListArry);
                }
            })
        },function(areaListArry,callback){
            var tempArray = [];
            tempArray = areaListArry;
            PgModel.find({owner_id: req.params.owner_id, status:true},function(err,areaListFlat){
                if(err){
                    callback(null,err);
                } else {
                    areaListFlat.forEach(function(item) { 
                        tempArray.push(item);
                    })
                    callback(null,tempArray);
                }
            })
        }
    ],function(error,result){
        if(error){
           res.send(send_response(null,true,error)); 
       } else {
        res.send(send_response(result,false,"Success"));
       }
    })

}

exports.getByIdPanding = function(req,res){
    var PgModel = mongoose.model('Pg');
    var FlatModel = mongoose.model('Flat');
    var whom = req.params.whom;
    var areaListArry = [];

    async.waterfall([
        function(callback){
            FlatModel.find({owner_id: req.params.owner_id, status:false},function(err,areaListFlat){
                if(err){
                    callback(null,err);
                } else {
                    areaListFlat.forEach(function(item) { 
                        areaListArry.push(item);
                    })
                    callback(null,areaListArry);
                }
            })
        },function(areaListArry,callback){
            var tempArray = [];
            tempArray = areaListArry;
            PgModel.find({owner_id: req.params.owner_id, status:false},function(err,areaListFlat){
                if(err){
                    callback(null,err);
                } else {
                    areaListFlat.forEach(function(item) { 
                        tempArray.push(item);
                    })
                    callback(null,tempArray);
                }
            })
        }
    ],function(error,result){
        if(error){
           res.send(send_response(null,true,error)); 
       } else {
        res.send(send_response(result,false,"Success"));
       }
    })

}


exports.getAllFlats = function(req,res){
    var FlatModel = mongoose.model('Flat');
    FlatModel.find({},function(err,flatList){
        if(err){
            res.send(send_response(null,true,err));
        } else {
            res.send(send_response(flatList));
        }
    })
}


exports.getFlatForHomePage = function(req,res){
    var FlatModel = mongoose.model('Flat');
    FlatModel.find({status:true}).sort({date: -1}).limit(5).exec(function(err,flatList){
        if(err){
            res.send(send_response(null,true,err));
        } else {
            res.send(send_response(flatList));
        }
    })
}

exports.UpdateFlat = function(req, res){
    var FlatModel = mongoose.model('Flat');
    FlatModel.findOne({"_id":req.body._id}, function (err, flat) {
        if (err) {
            res.send(send_response(null, true, "ERROR_USER_NOT_FOUND"));
        } else {
            delete req.body._id;
            var tempArray = [];
            tempArray = req.body.homeamenities;
            flat.homeamenities = tempArray;
            
            var updated_flat = _.assign(flat, req.body);
            updated_flat.save(function (err) {
                if (err) {
                    res.send(send_response(null, true, parse_error(err)));
                } else {
                    res.json({data: flat, is_error: false, message: 'Updated successfully'});
                }
            });
        }
    });
};