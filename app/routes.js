/**
 * Main application routes
 */

'use strict';

var path = require('path');
var auth = require('./auth/auth.service');

module.exports = function (app) {
app.use('/api/image', require('./api/upload'));
app.use('/api/query', require('./api/common'));
app.use('/api/login', require('./api/login'));
app.use('/api/users', require('./api/user'));
app.use('/api/cron', require('./api/cron'));
app.use('/api/notifications', require('./api/notification'));
app.use('/api/pg', require('./api/pg'));
app.use('/api/flat', require('./api/flat'));
app.use('/api/schedul', require('./api/schedul'));
app.use('/api/wishlist', require('./api/wishlist'));
app.use('/api/about', require('./api/about'));
app.use('/api/feedback', require('./api/feedback'));
app.use('/api/ContactUs', require('./api/contactus'));
app.use('/api/QA', require('./api/qa'));
app.use('/api/Terms', require('./api/terms'));
app.use('/auth', require('./auth'));
};
