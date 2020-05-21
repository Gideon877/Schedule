const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Message = new Schema({
    text: { type: String, required: true, unique: false },
    day: { type: Schema.Types.ObjectId, ref: 'Day' },
    sentBy: { type: Schema.Types.ObjectId, ref: 'User' },
    sentTo: { type: Schema.Types.ObjectId, ref: 'User' }

}, { timestamps: true });

module.exports = mongoose.model('Message', Message);