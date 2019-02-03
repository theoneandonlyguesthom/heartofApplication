'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var autopopulate = require('mongoose-autopopulate');

var FlatSchemaOptions = {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
};

var FlatSchema = new Schema({
    owner_id: {type: Schema.Types.ObjectId, ref: 'User', autopopulate: true},
    name: {type: String, default: ''},
    length: {type: Number, default: ''},
    rent: {type: Number, default: ''},
    avatar: {type: String, default: ''},
    deposite: {type: Number, default: ''},
    area: {type: String, default: ''},
    homeaddress: {type: String, default: ''},
    mentanace: {type: Number, default: ''},
    flrno: {type: Number, default: ''},
    noflor: {type: Number, default: ''},
    for_whom: {type: String, default: ''},
    house_type: {type: String, default: '0'},
    house_stay: {type: String, default: '0'},
    bedrooms: {type: Number, default: ''},
    balconies: {type: Number, default: ''},
    attachedbathroom:{type: Number, default: ''},
    commonbathroom:{type: Number, default: ''},
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
    latitude: {type: Number, default: ''},
    longtitude: {type: Number, default: ''},
    is_deleted: {type: Boolean, default: 'false'},
    status: {type: Boolean, default: 'false'},
    for_whom: {type: String, default: ''},
    home_type:{type: String, default: ''},
    imageObj:{type: String, default: ''},
    dateAdded: { type: Date, default: Date.now }
}, FlatSchemaOptions);

FlatSchema.plugin(autopopulate);

module.exports = mongoose.model('Flat', FlatSchema);