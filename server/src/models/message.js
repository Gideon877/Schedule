const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Message = new Schema({
    message: { type: String, required: true, unique: false },
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: Schema.Types.ObjectId, ref: 'User' }

}, { timestamps: true });

module.exports = mongoose.model('Message', Message);