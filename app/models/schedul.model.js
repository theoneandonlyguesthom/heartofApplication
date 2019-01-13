'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var autopopulate = require('mongoose-autopopulate');

var SchedulSchemaOptions = {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
};

var SchedulSchema = new Schema({
    
    //flat_id: {type: Schema.Types.ObjectId, ref: 'Flat', autopopulate: true},
    //pg_id: {type: Schema.Types.ObjectId, ref: 'Pg', autopopulate: true},
name: {type: String, default: ''},
    rent: {type: Number, default: ''},
    area: {type: String, default: ''},
    hometype: {type: String, default: ''},    
user_id: {type: Schema.Types.ObjectId, ref: 'User', autopopulate: true},
    date: { type: Date, default: Date.now },
    // time: { type: Date, default: Date.now },
    is_deleted: {type: Boolean, default: false},
    dateAdded: { type: Date, default: Date.now }
}, SchedulSchemaOptions);

SchedulSchema.plugin(autopopulate);

module.exports = mongoose.model('Schedul', SchedulSchema);
