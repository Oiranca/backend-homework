require('./connection/connection'); // importa el archivo de conexión
const mongoose = require('mongoose');
const work = require('./work');
const create = require('./controller/controlUserandGroup');

//create();

work();
