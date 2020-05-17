const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Schedule = new Schema({
    days: [{ type: Schema.Types.ObjectId, ref: 'Day', unique: true }],
    user: { type: Schema.Types.ObjectId, ref: 'User', unique: true}
}, { timestamps: true });

module.exports = mongoose.model('Schedule', Schedule);