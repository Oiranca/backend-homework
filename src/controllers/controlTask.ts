import { Request, Response } from 'express';
import User from '../model/user';
import jwt from 'jsonwebtoken';
import registerHome from '../model/group';
import registerTasks from '../model/tasks';

// ejemplo para postman
// {    "name": "Samuel",
//     "email": "oiranca@gmail.com",
//     "password":"Samuel",
//     "role": 100,
//     "_idHome": { type: mongoose.Schema.Types.ObjectID,ref:'Group' , unique: true },
//     "tasks": ["01/01/2020":{"Tarea1":"Lavar el coche","Tarea2":"Pasear al perro"}],
//   }

const createTasks = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    const _idHome = await User.findOne({ _id: req.sessionData.userId }).select({_idHome:1,_id:0});

    if (_idHome !== null) {
      await registerTasks.create({
        name,
        description,
        _idHome
      });
    }
    res.send({ status: 'Ok', message: 'Task Create' });
  } catch (e) {
    // TODO : Buscar y capturar con switch los errores para no pasar datos que no debemos en el mensaje

    res.status(500).send({ status: 'Error', message: e.message });
  }


};

const getTasks = async (req: Request, res: Response) => {
  try {
    let tasks;
    const isAdmin = req.sessionData.role;
    const idUserSearch = req.sessionData.userId;

    if (isAdmin === 100) {
      const idForSearch = await User.findOne({ _id: idUserSearch }).select('_idHome');
      tasks = await registerTasks.find({ _idHome: idForSearch!._idHome }).select('name');
      res.send({ status: 'Ok', data: tasks });
    } else if (isAdmin === 50) {
      tasks = await registerTasks.find({ _id: idUserSearch }).select('name');
      res.send({ status: 'Ok', data: tasks });
    }
  } catch (e) {
    // TODO : Buscar y capturar con switch los errores para no pasar datos que no debemos en el mensaje
    res.status(500).send({ status: 'Error', message: e.message });
  }
};


export default {
  createTasks,
  getTasks

};
