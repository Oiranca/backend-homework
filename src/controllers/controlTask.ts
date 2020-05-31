import { Request, Response } from 'express';
import User from '../model/user';

import TasksModel from '../model/tasks';

// ejemplo para postman
// {    "name": "Samuel",
//     "email": "oiranca@gmail.com",
//     "password":"Samuel",
//     "role": 100,
//     "_idHome": { type: mongoose.Schema.Types.ObjectID,ref:'Group' , unique: true },
//     "tasks": ["01/01/2020":{"Tarea1":"Lavar el coche","Tarea2":"Pasear al perro"}],
//   }

const createTasks = async (req: Request, res: Response) => {

  const { name, description } = req.body;

  // Create new tasks if not exist

  const newTasks = () => {
    return new Promise(async (resolve, reject) => {
      let _idHome, idCompare;
      _idHome = await User.findOne({ _id: req.sessionData.userId }).select({ _idHome: 1, _id: 0 });
      idCompare = await TasksModel.findOne({ name: name, _idHome: _idHome?._idHome }).select({ _id: 1 });
      if (idCompare == undefined) {
        console.log(`Id de la casa ${_idHome?._idHome}`);
        console.log(`User Id ${req.sessionData.userId}`);
        let tasksNotExist: String = _idHome!._idHome;
        resolve(tasksNotExist);
        res.send({ status: 'Ok', message: 'Task Create' });
      } else {
        let error: string = 'Not possible create new task';
        reject(error);
      }
    });
  };

  newTasks().then(creatingTasks => TasksModel.create({
    name,
    description,
    _idHome: creatingTasks
  })).catch(error => res.status(500).send({ status: 'Error', message: error.message }));


};

const getTasks = async (req: Request, res: Response) => {
  try {
    let tasks;
    const isAdmin = req.sessionData.role;
    const idUserSearch = req.sessionData.userId;

    if (isAdmin === 100) {
      const idForSearch = await User.findOne({ _id: idUserSearch }).select({ _idHome: 1, _id: 0 });
      tasks = await TasksModel.find({ _idHome: idForSearch?._idHome }).select({ name: 1, _id: 0 });
      res.send({ status: 'Ok', data: tasks });
    } else if (isAdmin === 50) {
      tasks = await TasksModel.find({ _id: idUserSearch }).select('name');
      res.send({ status: 'Ok', data: tasks });
    }
  } catch (e) {
    // TODO : Buscar y capturar con switch los errores para no pasar datos que no debemos en el mensaje
    res.status(500).send({ status: 'Error', message: e.message });
  }
};


const assignTasks = async (req: Request, res: Response) => {
  try {
    const { name, emailFamily } = req.body;
    let assig, taskAssign;
    const idUserSearch = req.sessionData.userId;
//Todo: Terminar la busqueda por id
    //  const searchFamily = await User.findOne({ _id: idUserSearch }).select({ _idHome: 1, _id: 0 });
    assig = await TasksModel.findOne({ name: name }).select('_id');

    // quitar cuando lo una a angular
    if (assig !== null) {
      taskAssign = {
        date: '01-01-01',
        name: name,
        idTask: assig._id
      };
      await User.findOneAndUpdate({ email: emailFamily }, { $push: { tasks: taskAssign } });
      res.send({ status: 'Ok', data: assig });
    } else {
      res.status(500).send({ status: 'Error', message: 'Tasks no found' });
    }


  } catch (e) {
    // TODO : Buscar y capturar con switch los errores para no pasar datos que no debemos en el mensaje
    res.status(500).send({ status: 'Error', message: e.message });
  }
};


export default {
  createTasks,
  getTasks,
  assignTasks

};
