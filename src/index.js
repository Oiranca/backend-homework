require('./connection/connection'); // importa el archivo de conexión
const User = require('./model/user'); // importa el esquema


var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};



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
        taskDate: Date()
    },
        {
            id: ID(),
            description: 'tarea2',
            done: true,
            taskDate: Date()
        }]

}); // crea la entidad

user.save(); // guarda en bd
