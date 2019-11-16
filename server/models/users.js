const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    quote: {type: String, default: "A sorte e o sucesso são resultados de um trabalho árduo..."}
})

const User = mongoose.model('User', UserSchema)

module.exports = User