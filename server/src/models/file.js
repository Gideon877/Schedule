const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const File = new Schema({
    path: { type: String, required: true },
    filename: { type: String, required: true },
    mimetype: { type: String, required: true },
    encoding: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('File', File);