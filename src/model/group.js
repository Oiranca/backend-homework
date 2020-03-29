//importamos mongoose

const mongoose = require('mongoose');

const gruopSchema = new mongoose.Schema({
    name: String,

},{collection:'group'});//le podemos poner el nombre a la lista

const Group = mongoose.model('Group', gruopSchema);


module.exports = Group;
