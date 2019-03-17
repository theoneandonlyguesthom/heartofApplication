'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var autopopulate = require('mongoose-autopopulate');

var MessageSchemaOptions = {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
};

var MessageSchema = new Schema({
    name: {type: String, default: ''},
    email: {type: String, default: ''},
    subject: {type: String, default: ''},
    message: {type: String, default: ''}, 
    is_deleted: { type: Boolean, default: false },
    dateAdded: { type: Date, default: Date.now }
}, MessageSchemaOptions);

MessageSchema.plugin(autopopulate);

module.exports = mongoose.model('Message', MessageSchema);
