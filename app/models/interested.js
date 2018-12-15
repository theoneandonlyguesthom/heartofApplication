'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var autopopulate = require('mongoose-autopopulate');

var InterestedSchemaOptions = {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
};

var InterestedSchema = new Schema({
    
    flat_id: {type: Schema.Types.ObjectId, ref: 'Flat', autopopulate: true},
    user_id: {type: Schema.Types.ObjectId, ref: 'User', autopopulate: true},
    owner_id: {type: Schema.Types.ObjectId, ref: 'User', autopopulate: true},
    date: { type: Date, default: Date.now },
    is_deleted: {type: Boolean, default: false},
    dateAdded: { type: Date, default: Date.now }
}, InterestedSchemaOptions);

InterestedSchema.plugin(autopopulate);

module.exports = mongoose.model('Interested', InterestedSchema);