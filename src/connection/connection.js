//importamos mongoose
const mongoose = require('mongoose');

// colocamos la url de conexión local y el nombre de la base de datos

const init = async () => {
  await mongoose.connect('mongodb://localhost:27017', {
    dbName: 'pruebasDB',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

init();

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); // enlaza el track de error a la consola (proceso actual)
db.once('open', () => {
  console.log('connected'); // si esta todo ok, imprime esto
});
