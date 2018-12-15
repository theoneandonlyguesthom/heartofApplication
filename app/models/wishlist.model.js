'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var autopopulate = require('mongoose-autopopulate');

var WishlistSchemaOptions = {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
};

var WishlistSchema = new Schema({
    
    flat_id: {type: Schema.Types.ObjectId, ref: 'Flat', autopopulate: true},
    pg_id: {type: Schema.Types.ObjectId, ref: 'Pg', autopopulate: true},
    user_id: {type: Schema.Types.ObjectId, ref: 'User', autopopulate: true},
    is_deleted: {type: Boolean, default: false},
    dateAdded: { type: Date, default: Date.now }
}, WishlistSchemaOptions);

WishlistSchema.plugin(autopopulate);

module.exports = mongoose.model('Wishlist', WishlistSchema);