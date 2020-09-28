const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Days = new Schema({
    name: { type: String, required: true, unique: true },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

module.exports = mongoose.model('Days', Days);