//importamos mongoose

const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: String,
    email:String,
    password:String,
    image:Buffer,
    role:Number,
    _idHome:mongoose.ObjectId,
    tasks:Array

},{collection:'users'});//le podemos poner el nombre a la lista

const User = mongoose.model('User', userSchema);


module.exports = User;
