//importamos mongoose
const mongoose = require('mongoose');

// importa el esquema
const User = require('../model/user');
const Group = require('../model/group');

//función para crear id aleatorio para taks

function createUsers() {
    /**
     * @return {string}
     */
    var ID = function () {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    async function userExist() {
        let isExist;
        const users = await User.find({
            email: emailTest,
        });

        isExist = users.length !== 0;

        return isExist;
    };

    let emailTest = "fam2@gmail.com";

//ver en consola el resultado de una promesa

    userExist().then(function (result) {
        if (result === true) {
            console.log('El usuairo ya existe en la base datos');
        } else {
            const group = new Group({
                name: "Nombre a elegir por el admin"
            });

            group.save();

            const user = new User({
                name: 'Samuel',
                email: 'gmail@gmail.com',
                password: 'samuel',
                image: null,
                role: 100,
                _idHome: group._id,
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

            console.log('Se a creado correctamente ');
        }

    });


//creamos el group


    /*cada usuario tiene sus propias tareas y en la fecha taskCreate
    pondremos la fecha cuando tiene que realizarlas.
    En el idHome tenemos que traer el id Group*/


}

module.exports = createUsers;