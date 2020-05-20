import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../model/user';
import jwt from 'jsonwebtoken';
import registerHome from '../model/group';

// ejemplo para postman
// {    "name": "Samuel",
//     "email": "oiranca@gmail.com",
//     "password":"Samuel",
//     "role": 100,
//     "_idHome": { type: mongoose.Schema.Types.ObjectID,ref:'Group' , unique: true },
//     "tasks": ["01/01/2020":{"Tarea1":"Lavar el coche","Tarea2":"Pasear al perro"}],
//   }

const expiresIn = 60 * 10; // tiempo 10 minuto //TODO: Mirar que se anule el token al hacer logout

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      const isCorrect = await bcrypt.compare(password, user.password);
      if (isCorrect) {
        const token = jwt.sign(
          { userId: user._id, role: user.role },
          process.env.JWT_SECRET!,
          { expiresIn: expiresIn } // tiempo que tiene de validez el token
        );

        res.send({ status: 'ok', data: { token, expiresIn } });
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

const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, tasks } = req.body;

    const hash = await bcrypt.hash(password, 15);
    let _idHome = await User.findOne({ email: req.body.adminEmail }).select({ _idHome: 1, _id: 0 });

    if (_idHome !== null) {

      // se usa await para primero crear el usuairo y luego enviar la respuesta
      await User.create({
        name, // Cuando el atributo tiene el mismo nombre que en el esquema
        email,
        password: hash,
        role: 50,
        _idHome,
        tasks
      });
    } else {
      //todo: se pone el nombre automático, pendiente de ponerlo para que lo elija
      const nameHome = req.body.home;

      await registerHome.create({
        name: nameHome
      });
      const _idHome = await registerHome.findOne({ name: req.body.home }).select('_id');
      await User.create({
        name, // Cuando el atributo tiene el mismo nombre que en el esquema
        email,
        password: hash,
        role: 100,
        _idHome,
        tasks
      });
    }

    res.send({ status: 'Ok', message: 'User Create' });
  } catch (e) {
    // TODO : Buscar y capturar con switch los errores para no pasar datos que no debemos en el mensaje

    res.status(500).send({ status: 'Error', message: e.message });
  }


};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const isAdmin = req.sessionData.role;
    if (isAdmin !== 100) {
      //TODO: buscar la manera de enviar el correo al administrador
      res.send({ status: 'Ok', message: 'Email has sended to administrator' });
      return;
    }
    const family = await User.find({ _idHome: req.body.id });
    res.send({ status: 'Ok', message: 'All data has been deleted' });
  } catch (e) {
    // TODO : Buscar y capturar con switch los errores para no pasar datos que no debemos en el mensaje
    res.status(500).send({ status: 'Error', message: e.message });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    let family;
    const isAdmin = req.sessionData.role;
    const idUserSearch = req.sessionData.userId;

    if (isAdmin === 100) {
      const idForSearch = await User.findOne({ _id: idUserSearch }).select('_idHome');
      family = await User.find({ _idHome: idForSearch!._idHome }).select('name _id _idHome tasks');
      res.send({ status: 'Ok', data: family });
    } else if (isAdmin === 50) {
      family = await User.find({ _id: idUserSearch }).select('name _id _idHome tasks');
      res.send({ status: 'Ok', data: family });
    }
  } catch (e) {
    // TODO : Buscar y capturar con switch los errores para no pasar datos que no debemos en el mensaje
    res.status(500).send({ status: 'Error', message: e.message });
  }
};


const getReport = async (req: Request, res: Response) => {
  try {
    let reportUsers;
    const isAdmin = req.sessionData.role;
    const idUserSearch = req.sessionData.userId;

    if (isAdmin === 100) {
      const idForSearch = await User.findOne({ _id: idUserSearch }).select('_idHome');
      reportUsers = await User.find({ _idHome: idForSearch!._idHome }).select('name tasks');
      res.send({ status: 'Ok', data: reportUsers });
    } else if (isAdmin === 50) {
      reportUsers = await User.find({ _id: idUserSearch }).select('name tasks');
      res.send({ status: 'Ok', data: reportUsers });
    }
  } catch (e) {
    // TODO : Buscar y capturar con switch los errores para no pasar datos que no debemos en el mensaje
    res.status(500).send({ status: 'Error', message: e.message });
  }


};

const updateUser = (req: Request, res: Response) => {
  res.status(200).json({
    UserStatus: 'Update'
  });
};

export default {
  registerUser,
  deleteUser,
  getUser,
  getReport,
  updateUser,
  login
};
