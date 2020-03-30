require('./connection/connection'); // importa el archivo de conexión
const mongoose = require('mongoose');
//const work = require('./work');
const User = require('./model/user'); // importa el esquema
const Group = require('./model/group');

var Schema = mongoose.Schema;
/**
 * @return {string}
 */
var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};





const group= new Group({
    name:"Nombre a elegir por el admin"
});

group.save();



/*async function idGropuf() {
const idGp = await Group.findOne({_id:mongoose.ObjectId})

  return idGp;
};

console.log(idGropuf().then(function (result) {
    return result;
}));

var idHome=idGropuf().then(function (result) {
return result;
});*/

/*cada usuario tiene sus propias tareas y en la fecha taskCreate
pondremos la fecha cuando tiene que realizarlas.
En el idHome tenemos que traer el id Group*/


const user = new User({
    name: 'Samuel',
    email: 'gmail@gmail.com',
    password: 'samuel',
    image: null,
    role: 100,
    _idHome:group._id ,
    tasks: [{
        id: ID(),
        description: 'tarea1',
        done: true,
        createDate: Date()
    }
        , {
            id: ID(),
            description: 'tarea2',
            done: true,
            createDate: Date()
        }]

}); // crea la entidad

user.save(); // guarda en bd

//work();
