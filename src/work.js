const User = require('./model/user');
const Controlgroup = require('./model/group');
const mongoose = require('mongoose');
/**
 * @return {string}
 */
var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};

//{ $addToSet: { <field>: { $each: [ <value1>, <value2> ... ] } } }
async function work() {
    let newTasks;
    let b = {
        id: ID(),
        description: 'tarea3',
        done: true,
        createDate: Date()
    };
    let c = {
        id: ID(),
        description: 'tarea4',
        done: true,
        createDate: Date()
    };
    const users = await User.updateMany({
            name: 'Samuel',
        }, {
            $push: {tasks: {$each: [b, c]}}
        }
    );






    return users;
   }

//ver en consola el resultado de una promesa
    /*
    work().then(function (result) {

    for(const as of result){
        let b={
            id: ID(),
            description: 'tarea4',
            done: true,
            createDate: Date()
        };
        as.tasks.push(b);
        console.log(as);
    }

    });*/

    module.exports = work;



