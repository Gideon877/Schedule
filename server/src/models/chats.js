const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Chats = new Schema({
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Message'
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    participant: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

module.exports = mongoose.model('Chats', Chats)