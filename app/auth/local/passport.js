var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.setup = function (User, config) {
    passport.use(new LocalStrategy({
        usernameField: 'phone',
        passwordField: 'password' // this is the virtual field on the model
    },
            function (phone, password, done,req) {
                User.findOne({
                    phone_number: phone
                }, function (err, user) {
                    if (err)
                        return done(err);
                    if (!user) {
                        //return done(null, false, {message: 'This phone number is not registered.'});
                        return done(null, false, {message: 'This phone number is not registered.'});
                    }
                    if (!user.authenticate(password)) {
                        return done(null, false, {message: 'This password is not correct.'});
                        //return done(null, false, {message: 'This password is not correct.'});
                    }
                    return done(null, user);
                });
            }   
    ));
};