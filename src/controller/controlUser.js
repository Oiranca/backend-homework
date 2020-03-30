const User = require('../model/user'); // importa el esquema

/**
 * @return {string}
 */
var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};

/*cada usuario tiene sus propias tareas y en la fecha createDate
pondremos la fecha cuando tiene que realizarlas.
En el idHome tenemos que traer el id Group*/

const user = new User({
    name: 'Samuel',
    email: 'gmail@gmail.com',
    password: 'samuel',
    image: null,
    role: 50,
    idHome: "5e80dff9c63d77613aef81bb",
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
