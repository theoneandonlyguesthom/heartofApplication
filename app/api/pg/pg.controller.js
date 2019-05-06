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
var msg91 = require("msg91")("248937AQnwe6yw39W5bfa3302", "8347635563", "106" );

exports.UpdateFlat = function(req, res){
    var PgModel = mongoose.model('Flat');
    PgModel.findOne({"_id":req.body._id}, function (err, pg) {
        if (err) {
            res.send(send_response(null, true, "ERROR_USER_NOT_FOUND"));
        } else {
            var updated_pg = _.assign(pg, req.body);
            updated_pg.save(function (err) {
                if (err) {
                    res.send(send_response(null, true, parse_error(err)));
                } else {

                    PgModel.findOne({"_id":req.body._id}, function (err, userObject) {
                        if (err) {
                            res.send(send_response(null, true, "ERROR_USER_NOT_FOUND"));
                        } else {
                            const ownerMobileNumber = userObject.owner_id.phone_number;
                            const MessageText = "Congratulations! Your " + userObject.area + "'s " + userObject.name + " Flat approved now user can see and book your Flat. Message sent by Guesthom team Thanks for connecting with us";
                            msg91.send(ownerMobileNumber, MessageText, function(err, response){
                                console.log(response);
                            });
                        }
                    });
                    res.json({data: pg, is_error: false, message: 'Updated successfully'});
                }
            });
        }
    });
};



// exports.getPendingHomesAndPGs = function(req,res){
//     var PgModel = mongoose.model('Pg');
//     var FlatModel = mongoose.model('Flat');
//     var areaListArry = [];

//     async.waterfall([
//         function(callback){
//             FlatModel.find({},function(err,areaListFlat){
//                 if(err){
//                     callback(null,err);
//                 } else {
//                     areaListFlat.forEach(function(item) { 
//                         areaListArry.push(item);
//                     })
//                     callback(null,areaListArry);
//                 }
//             })
//         },function(areaListArry,callback){
//             PgModel.find({},function(err,areaListFlat){
//                 if(err){
//                     callback(null,err);
//                 } else {
//                     areaListFlat.forEach(function(item) { 
//                         areaListArry.push(item);
//                     })
//                     callback(null,areaListArry);
//                 }
//             })
//         }
//     ],function(error,result){
//         if(error){
//            res.send(send_response(null,true,error)); 
//        } else {
//         res.send(send_response(result,false,"Success"));
//        }
//     })

// }


const sgMail = require('@sendgrid/mail');
var EmailTemplates = require('swig-email-templates');


exports.addPg = function (req, res) {
    var PgModel = mongoose.model('Pg');
    var data = req.body;
    var userData = req.user;
    data.owner_id = userData._id;
    var html = userData.first_name + ' ' + userData.last_name +  ' Added new pg in '+ data.area + ' area';
    
    var transporter = nodemailer.createTransport("smtps://guesthom%40gmail.com:"+encodeURIComponent('LenovoDolby1') + "@smtp.gmail.com:465");
        var mailOptions = {
            from: 'guesthom@gmail.com', // sender address
            to: 'guesthom@gmail.com', // list of receivers
            subject: "New pg request",
            html : html 
        };
       // print_r(transporter);
    PgModel.create(data, function (err, user) {
        if (err) {
            res.send(send_response(null, true, err));
        } else {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error + "Error");
                }
            });
            res.send(send_response(null, true, "Pg Inserted successfully"));
        }
    });
};

exports.getAllPgs = function(req,res){
    var PgModel = mongoose.model('Pg');
    PgModel.find({},function(err,userList){
        if(err){
            res.send(send_response(null,true,err));
        } else {
            res.send(send_response(userList));
        }
    })
}

exports.getAllPgswithoutlogin = function(req,res){
    var PgModel = mongoose.model('Pg');
    PgModel.find({},function(err,userList){
        if(err){
            res.send(send_response(null,true,err));
        } else {
            res.send(send_response(userList));
        }
    })
}

exports.getHomeListByGender = function(req,res){
    var PgModel = mongoose.model('Pg');
    var FlatModel = mongoose.model('Flat');
    var whom = req.params.whom;
    var areaListArry = [];

    async.waterfall([
        function(callback){
            FlatModel.find({for_whom: whom, status:true},function(err,areaListFlat){
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
            PgModel.find({for_whom: whom, status:true},function(err,areaListFlat){
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

exports.getHomeListByArea = function(req,res){
    var PgModel = mongoose.model('Pg');
    var FlatModel = mongoose.model('Flat');
    var area = req.params.area;
    var areaListArry = [];

    async.waterfall([
        function(callback){
            FlatModel.find({area: area,status:true},function(err,areaListFlat){
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
            PgModel.find({area: area,status:true},function(err,areaListFlat){
                if(err){
                    callback(null,err);
                } else {
                    areaListFlat.forEach(function(item) { 
                        areaListArry.push(item);
                    })
                    callback(null,areaListArry);
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

exports.getPendingHomesAndPGs = function(req,res){
    var PgModel = mongoose.model('Pg');
    var FlatModel = mongoose.model('Flat');
    var areaListArry = [];

    async.waterfall([
        function(callback){
            FlatModel.find({status:false},function(err,areaListFlat){
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
            PgModel.find({status:false},function(err,areaListFlat){
                if(err){
                    callback(null,err);
                } else {
                    areaListFlat.forEach(function(item) { 
                        areaListArry.push(item);
                    })
                    callback(null,areaListArry);
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
exports.filterAPI = function(req,res){
    var tenantType = req.body.tenantType;
    var filterPrice = req.body.price;
    var filterbadrooms = req.body.bhkSelected;
    var interiortype = req.body.interiortype;
    if(req.body.homeTypeSubmit !== '' && req.body.homeTypeSubmit === 'Flat'){
        if(filterbadrooms !== 0 && interiortype === ''){
            var Model = mongoose.model(req.body.homeTypeSubmit);
            Model.find({rent: { $gte :  5000, $lte : filterPrice},for_whom:tenantType,status:true,bedrooms:filterbadrooms},function(err,areaListFlat){
                if(err){
                    res.send(send_response(null,true,error));
                } else {
                    res.send(send_response(areaListFlat,false,"Success"));
                }
            })
        } else if(filterbadrooms !== 0 && interiortype !== ''){
            var Model = mongoose.model(req.body.homeTypeSubmit);
            Model.find({rent: { $gte :  5000, $lte : filterPrice},for_whom:tenantType,status:true,bedrooms:filterbadrooms,interiortype:interiortype},function(err,areaListFlat){
                if(err){
                    res.send(send_response(null,true,error));
                } else {
                    res.send(send_response(areaListFlat,false,"Success"));
                }
            })
        }  else if(filterbadrooms === 0 && interiortype !== ''){
            var Model = mongoose.model(req.body.homeTypeSubmit);
            Model.find({rent: { $gte :  5000, $lte : filterPrice},for_whom:tenantType,status:true,interiortype:interiortype},function(err,areaListFlat){
                if(err){
                    res.send(send_response(null,true,error));
                } else {
                    res.send(send_response(areaListFlat,false,"Success"));
                }
            })
        } else {
            var Model = mongoose.model(req.body.homeTypeSubmit);
            Model.find({rent: { $gte :  1000, $lte : filterPrice},for_whom:tenantType,status:true},function(err,areaListFlat){
                if(err){
                    res.send(send_response(null,true,error));
                } else {
                    res.send(send_response(areaListFlat,false,"Success"));
                }
            })
        }
    } else if(req.body.homeTypeSubmit !== '' && req.body.homeTypeSubmit === 'Pg'){
        var Model = mongoose.model(req.body.homeTypeSubmit);
            Model.find({rent: { $gte :  1000, $lte : filterPrice},for_whom:tenantType,status:true},function(err,areaListFlat){
                if(err){
                    res.send(send_response(null,true,error));
                } else {
                    res.send(send_response(areaListFlat,false,"Success"));
                }
            })
    } else {
        var PgModel = mongoose.model('Pg');
        var FlatModel = mongoose.model('Flat');
        var priceValue = req.body.price;
        var tenantType = req.body.tenantType;
        var areaListArry = [];

        async.waterfall([
            function(callback){
                FlatModel.find({rent: { $gte :  5000, $lte : priceValue},for_whom:tenantType,status:true},function(err,areaListFlat){
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
                PgModel.find({rent: { $gte :  5000, $lte : priceValue},for_whom:tenantType,status:true},function(err,areaListFlat){
                    if(err){
                        callback(null,err);
                    } else {
                        areaListFlat.forEach(function(item) { 
                            areaListArry.push(item);
                        })
                        callback(null,areaListArry);
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
}
 
exports.getFilteredItem = function(req,res){
    var PgModel = mongoose.model('Pg');
    var FlatModel = mongoose.model('Flat');
    var priceValue = req.params.price;
    var tenantType = req.params.tenantType;
    var areaListArry = [];

    async.waterfall([
        function(callback){
            FlatModel.find({rent: { $gte :  5000, $lte : priceValue},for_whom:tenantType,status:true},function(err,areaListFlat){
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
            PgModel.find({rent: { $gte :  5000, $lte : priceValue},for_whom:tenantType,status:true},function(err,areaListFlat){
                if(err){
                    callback(null,err);
                } else {
                    areaListFlat.forEach(function(item) { 
                        areaListArry.push(item);
                    })
                    callback(null,areaListArry);
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

exports.UpdatePg = function(req, res){
    var PgModel = mongoose.model('Pg');
    PgModel.findOne({"_id":req.body._id}, function (err, pg) {
        if (err) {
            res.send(send_response(null, true, "ERROR_USER_NOT_FOUND"));
        } else {
            var updated_pg = _.assign(pg, req.body);
            updated_pg.save(function (err) {
                if (err) {
                    res.send(send_response(null, true, parse_error(err)));
                } else {

                    PgModel.findOne({"_id":req.body._id}, function (err, userObject) {
                        if (err) {
                            res.send(send_response(null, true, "ERROR_USER_NOT_FOUND"));
                        } else {
                            const ownerMobileNumber = userObject.owner_id.phone_number;
                            const MessageText = "Congratulations! Your " + userObject.area + "'s " + userObject.name + " PG approved now user can see and book your PG. Message sent by Guesthom team Thanks for connecting with us";
                            msg91.send(ownerMobileNumber, MessageText, function(err, response){
                                console.log(response);
                            });
                        }
                    });
                    res.json({data: pg, is_error: false, message: 'Updated successfully'});
                }
            });
        }
    });
};

exports.sendTempMail = function(req,res){

    // var templates = new EmailTemplates();
    // var replace_var = {
    //     username: "Narendra",
    //     password: "Solanki",
    //     link: "This is the amezing if happen"

    // }
    // templates.render(templatesDir + '/newpgorflat.html', replace_var, function (err, html, text) {
    //     sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    //     var mailOptions = {
    //         from: 'ndsnaren@gmail.com', // sender address
    //         to: 'ndsnaren@gmail.com', // list of receivers
    //         subject: 'Request to reset password from application', // Subject line
    //         html: html // html body
    //     };
    //     sgMail.send(mailOptions, function (error, info) {
    //         if (error) {
    //             res.json({data: error, is_error: true, message: 'Error sending email'});
    //         } else {
    //             res.json({data: data, is_error: false, message: 'Email sent to reset password'});
    //         }
    //     });
    // })


    console.log("Calling from here");
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
    to: 'ndsnaren@gmail.com',
    from: 'ndsnaren@gmail.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(mailOptions, function (error, info) {
        if (error) {
            res.json({data: error, is_error: true, message: 'Error sending email'});
        } else {
            res.json({data: data, is_error: false, message: 'Email sent to reset password'});
        }
    });
}