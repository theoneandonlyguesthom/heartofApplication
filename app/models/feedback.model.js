'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var autopopulate = require('mongoose-autopopulate');

var FeedbackSchemaOptions = {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
};

var FeedbackSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User', autopopulate: true},
    rating: {type: Number, default: ''},
    text: {type: String, default: ''},
    is_deleted: {type: Boolean, default: false},
    dateAdded: { type: Date, default: Date.now }
}, FeedbackSchemaOptions);

FeedbackSchema.plugin(autopopulate);

module.exports = mongoose.model('Feedback', FeedbackSchema);