'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var autopopulate = require('mongoose-autopopulate');

var NewslatterSchemaOptions = {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
};

var NewslatterSchema = new Schema({
    email: {type: String, default: ''},
    is_deleted: {type: Boolean, default: false},
    dateAdded: { type: Date, default: Date.now }
}, NewslatterSchemaOptions);

NewslatterSchema.plugin(autopopulate);

module.exports = mongoose.model('Newslatter', NewslatterSchema);