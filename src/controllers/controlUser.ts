import {Request,Response} from 'express';
import bcrypt from 'bcrypt';
import  User  from '../model/user';
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
const login = async (req:Request, res:Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {

      const isCorrect = await bcrypt.compare(password, user.password);
      if (isCorrect) {
        const token = jwt.sign(
          { userId: user._id, role: user.role },
          process.env.JWT_SECRET!,{expiresIn: expiresIn}// tiempo que tiene de validez el token
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
const createUser = async (req:Request, res:Response) => {
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

const deleteUser = (req:Request, res:Response) => {
  res.status(200).json({
    UserStatus: 'Delete',
  });
};
const getUser = async (req:Request, res:Response) => {
  try {
    const family = await User.find().select('name email _idhome role');
    res.send({ status: 'Ok', data: family });
  } catch (e) {
    // TODO : Buscar y capturar con switch los errores para no pasar datos que no debemos en el mensaje
    res.status(500).send({ status: 'Error', message: e.message });
  }
};
const updateUser = (req:Request, res:Response) => {
  res.status(200).json({
    UserStatus: 'Update',
  });
};

export default {
  createUser,
  deleteUser,
  getUser,
  updateUser,
  login,
};
