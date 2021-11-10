const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    proba: {
        type: String,
        default: '583',
        required: false
    },
    toshi: {
        type: String,
        default: 'Toshi yoq',
        required: false
    },
    AllVazni: {
        type: String,
    },
    ToshBilanVazni: {
        type: String,
    },
    qaerniki: {
        type: String,
    },
    OlinganNarxi: {
        type: String,
    },
    SotilishNarxi: {
        type: String,
    },
    image: {
        type: String,
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('book', bookSchema)