//importamos mongoose

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: String,

},{collection:'task'});//le podemos poner el nombre a la lista

const Task = mongoose.model('Task', taskSchema);


module.exports = Task;
