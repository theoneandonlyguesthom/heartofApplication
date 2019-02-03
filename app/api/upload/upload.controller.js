var _ = require('lodash');
var mongoose = require("mongoose");
var path = require('path');
var fs = require('fs');
var async = require('async');

exports.uploadFile = function (req, res) {
    console.log('Callling ...........')
    res.send(send_response(req.file.filename, false, "File uploaded"));
}

exports.removeFile = function (req, res) {
    var filepath = path.join('public/upload/', req.params.filename);
    fs.exists(filepath, function (exists) {
        if (exists) {
            fs.unlink(filepath, function () {
                res.send(send_response(true));
            });
        } else {
            res.send(send_response(null, true, "File not exists"));
        }
    });
}



// Get list of things
exports.uploadimage = function (req, res) {
    console.log("Here");
    console.log(req.body);
    // console.log(req.file.filename);
    var Model = mongoose.model(req.params.collection);
    Model.findOne({_id: req.params.id}, function (err, mod) {
        if (err) {
            // console.log(err);
            console.log("Here");
            res.send(send_response(null, true, "Could not find " + req.params.collection));
        } else {
            var field = req.body.field;
            mod[field] = req.file.filename;

            mod.save(function (err, obj) {
                if (err) {
                    console.log("i am here")
                    console.log(err);
                    res.send(send_response(null, true, "Could not save file"));
                } else {
                    console.log("oooooo");
                    res.send(send_response(obj));
                }
            });
        }
    });
};



exports.uploadimageMultiple = function(req,res){
    let _id = req.body._id;
	let images = {};
    let i = 0;
    let avatarFile = req.files[0].filename; 
	for(i; i < req.files.length; i++) {
		images[i] = req.files[i].filename;
	}
    
    var Model = mongoose.model(req.params.collection);
    Model.findOne({_id: req.params.id}, function (err, mod) {
        if (err) {
            // console.log(err);
            res.send(send_response(null, true, "Could not find " + req.params.collection));
        } else {
            var field = req.body.field;
            mod[field] = JSON.stringify(images);
            mod['avatar'] = avatarFile;
            mod.save(function (err, obj) {
                if (err) {
                    res.send(send_response(null, true, "Could not save file"));
                } else {
                    res.send(true );
                }
            });
        }
    });
}




exports.uploadMultiFile = function (req, res) {
    
    var Model = mongoose.model(req.params.collection);

    Model.findOne({_id: req.params.id}, function (err, mod) {
        if (err) {
            console.log(err);
            res.send(send_response(null, true, "Could not find " + req.params.collection));
        } else {
            console.log(req.body);
            console.log(req.files);
            var i = 0;
            async.each(req.files, function (file, cb) {
                
                console.log(field);
                var field = req.body[i].field;
                mod[field] = file.filename;
                console.log(file.filename);
                console.log(mod[field]);
                i++;
                cb();
            }, function (err) {
                if (err) {
                    console.log(err);
                } else {

                    mod.save(function (err, obj) {
                        if (err) {
                            console.log(err);
                            res.send(send_response(null, true, "Could not save file"));
                        } else {
                            res.send(send_response(obj));
                        }
                    });

                }
            })
        }
    });

};


exports.image = function (req, res) {
    var filepath = path.join('public/upload/', req.params.filename);
    fs.stat(filepath, function (err, stat) {
        if (err == null) {
            console.log('File exists');
            fs.createReadStream(filepath).pipe(res)
        } else if (err.code == 'ENOENT') {
            // file does not exist
            //fs.writeFile('log.txt', 'Some log\n');
        } else {
            console.log('Some other error: ', err.code);
        }
    });

    //res.send({});
}
