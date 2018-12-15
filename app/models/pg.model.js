'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var autopopulate = require('mongoose-autopopulate');

var PgSchemaOptions = {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
};

var PgSchema = new Schema({
    owner_id: {type: Schema.Types.ObjectId, ref: 'User', autopopulate: true},
    name: {type: String, default: ''},
    bedrooms: {type: Number, default: ''},
    // available_space_room: {type: Number, default: '0'},
    // available_space_hall: {type: Number, default: '0'},
    avatar: {type: String, default: ''},
    bed:{type: Boolean, default: 'false'},
    tv:{type: Boolean, default: 'false'},
    fridge:{type: Boolean, default: 'false'},
    ac:{type: Boolean, default: 'false'},
    geyser:{type: Boolean, default: 'false'},
    gas:{type: Boolean, default: 'false'},
    indian_toilet:{type: Boolean, default: 'false'},
    western_toilet:{type: Boolean, default: 'false'},
    cupboard:{type: Boolean, default: 'false'},
    roomcleaner:{type: Boolean, default: 'false'},
    wachingmachin:{type: Boolean, default: 'false'},
    wifi:{type: Boolean, default: 'false'},
    parking:{type: Boolean, default: 'false'},
    lift:{type: Boolean, default: 'false'},
    gym:{type: Boolean, default: 'false'},
    sequrity:{type: Boolean, default: 'false'},
    playground:{type: Boolean, default: 'false'}, 
    rent: {type: Number, default: ''},
    deposite: {type: Number, default: ''},
    area: {type: String, default: ''},
    latitude: {type: Number, default: ''},
    longtitude: {type: Number, default: ''},
    is_deleted: {type: Boolean, default: false},
    status: {type: Boolean, default: 'false'},
    home_type:{type: String, default: ''},
    for_whom: {type: String, default: ''},
    dateAdded: { type: Date, default: Date.now }
}, PgSchemaOptions);

PgSchema.plugin(autopopulate);

module.exports = mongoose.model('Pg', PgSchema);