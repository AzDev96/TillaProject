const {Schema, model} = require('mongoose');


const CategoryShcema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    updated: {
        type: Date,
        default: Date.now
    }
})
module.exports = model('category', CategoryShcema)