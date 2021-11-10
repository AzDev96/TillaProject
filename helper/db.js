const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://movies:02e8h0qvkAS13f7w@cluster0.mm3oe.mongodb.net/test')
    .then(() => {
        console.log(`Mongoga Ulandik`)
    }).catch(err => {
        console.log(err)
    })
}