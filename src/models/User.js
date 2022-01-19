const { Schema, model } = require('mongoose')


const User = new Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    image: {
        type: String,
    }
})

User.set('timestamps', true)

module.exports = model('User', User)