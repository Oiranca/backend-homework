import bcrypt from 'bcrypt';
import { User } from '../model/user';
import jwt from 'jsonwebtoken';

// ejemplo para postman
// {    "name": "Samuel",
//     "email": "oiranca@gmail.com",
//     "password":"Samuel",
//     "role": 100,
//     "_idHome": { type: mongoose.Schema.Types.ObjectID,ref:'Group' , unique: true },
//     "tasks": ["01/01/2020":{"Tarea1":"Lavar el coche","Tarea2":"Pasear al perro"}],
//   }
const expiresIn = 60*10; // tiempo 10 minutod
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      // TODO: ??

      const isCorrect = await bcrypt.compare(password, user.password);
      if (isCorrect) {
        const token = jwt.sign(
          { userId: user._id, role: user.role },
          process.env.JWT_SECRET,{expiresIn: expiresIn}// tiempo que tiene de validez el token
        );
        res.send({ status: 'ok', data: {token,expiresIn} });
      } else {
        res.status(403).send({ status: 'INVALID_PASSWORD', message: '' });
      }
    } else {
      res.status(401).send({ status: 'USER_NOT_FOUND', message: '' });
    }
  } catch (e) {
    res.status(500).send({ status: 'ERROR', message: e.message });
  }
};
const createUser = async (req, res) => {
  try {
    const { name, email, password, role, _idHome, tasks } = req.body;

    const hash = await bcrypt.hash(password, 15);
    // se usa awati para primero crear el usuairo y luego enviar la respuesta
    await User.create({
      name, // Cuando el atributo tiene el mismo nombre que en el esquema
      email,
      password: hash,
      role,
      _idHome,
      tasks,
    });

    res.send({ status: 'Ok', message: 'User Create' });
  } catch (e) {
    // TODO : Buscar y capturar con switch los errores para no pasar datos que no debemos en el mensaje

    res.status(500).send({ status: 'Error', message: e.message });
  }
};

const deleteUser = (req, res) => {
  res.status(200).json({
    UserStatus: 'Delete',
  });
};
const getUser = async (req, res) => {
  try {
    const family = await User.find().select('name email _idhome role');
    res.send({ status: 'Ok', data: family });
  } catch (e) {
    // TODO : Buscar y capturar con switch los errores para no pasar datos que no debemos en el mensaje
    res.status(500).send({ status: 'Error', message: e.message });
  }
};
const updateUser = (req, res) => {
  res.status(200).json({
    UserStatus: 'Update',
  });
};

module.exports = {
  createUser,
  deleteUser,
  getUser,
  updateUser,
  login,
};

// // importamos mongoose
// const mongoose = require('mongoose');
//
// // importa el esquema
// const User = require('../model/user');
// const Group = require('../model/group');
//
// //función para crear id aleatorio para taks
//
// function createUsers() {
//   /**
//    * @return {string}
//    */
//   const ID = function () {
//     // Math.random should be unique because of its seeding algorithm.
//     // Convert it to base 36 (numbers + letters), and grab the first 9 characters
//     // after the decimal.
//     return `_${Math.random().toString(36).substr(2, 9)}`;
//   };
//
//   async function userExist() {
//     let isExist;
//     const users = await User.find({
//       email: emailTest,
//     });
//
//     isExist = users.length !== 0;
//
//     return isExist;
//   }
//
//   let emailTest = 'fam2@gmail.com';
//
//   //ver en consola el resultado de una promesa
//
//   userExist().then(function (result) {
//     if (result === true) {
//       console.log('El usuairo ya existe en la base datos');
//     } else {
//       const group = new Group({
//         name: 'Nombre a elegir por el admin',
//       });
//
//       group.save();
//
//       const user = new User({
//         name: 'Samuel',
//         email: 'gmail@gmail.com',
//         password: 'samuel',
//         image: null,
//         role: 100,
//         _idHome: group._id,
//         tasks: [
//           {
//             id: ID(),
//             description: 'tarea1',
//             done: true,
//             createDate: Date(),
//           },
//           {
//             id: ID(),
//             description: 'tarea2',
//             done: true,
//             createDate: Date(),
//           },
//         ],
//       }); // crea la entidad
//
//       user.save(); // guarda en bd
//
//       console.log('Se a creado correctamente ');
//     }
//   });
//
//   //creamos el group
//
//   /*cada usuario tiene sus propias tareas y en la fecha taskCreate
//     pondremos la fecha cuando tiene que realizarlas.
//     En el idHome tenemos que traer el id Group*/
// }
//
// module.exports = createUsers;
