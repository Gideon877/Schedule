const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Connection = new Schema({
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
    friend: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

module.exports = mongoose.model('Connection', Connection)