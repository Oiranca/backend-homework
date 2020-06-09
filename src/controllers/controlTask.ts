import { Request, Response } from 'express';
import User from '../model/user';

import TasksModel from '../model/tasks';
import PerformModel from '../model/tasksPerform';



const createTasks = async (req: Request, res: Response) => {

  const { name, description } = req.body;

  // Create new tasks if not exist

  const newTasks = () => {
    return new Promise(async (resolve, reject) => {
      let _idHome, idCompare;
      _idHome = await User.findOne({ _id: req.sessionData.userId }).select({ _idHome: 1, _id: 0 });
      idCompare = await TasksModel.findOne({ name: name, _idHome: _idHome?._idHome }).select({ _id: 1 });
      if (idCompare == undefined) {
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
  })).catch(error => res.status(500).send({ status: 'Error', message: error }));


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
    res.status(500).send({ status: 'Error', message: e.message });
  }
};


const assignTasks = async (req: Request, res: Response) => {

  const { name, emailFamily, dateAssigned } = req.body;

  const idUserSearch = req.sessionData.userId;


  const checkTasks = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const searchTasksHome = await User.findOne({ _id: idUserSearch }).select({ _idHome: 1, _id: 0 });
        const findFamily = await User.findOne({ email: emailFamily }).select({ _idHome: 1, _id: 1 });
        const datePerform = await PerformModel.find({ _idUser: findFamily?._id }).select({
          dateAssigned: 1,
          _idTasks: 1
        });
        const assign = await TasksModel.findOne({ _idHome: findFamily?._idHome, name: name }).select({ _id: 1 });

        let contDate: number = 0;
        let contTask: number = 0;
        let error = 'Not possible assign task';

        for (let datePerformElement of datePerform) {
          if (datePerformElement.dateAssigned === dateAssigned) {
            if (datePerformElement._idTasks === assign?.id) {
              contTask++;
            }
            contDate++;
          }
        }
        if (contDate < 2 && contTask < 1) {
          if (findFamily?._idHome === searchTasksHome?._idHome && assign!) {
            await PerformModel.create({
              _idTasks: assign?._id,
              _idHome: findFamily?._idHome,
              _idUser: findFamily?._id,
              dateAssigned
            });

            resolve(assign);
          } else {

            reject(error);
          }
        } else {
          reject(error);
        }
      } catch (error) {
        reject(error);
      }

    });
  };

  checkTasks().then(result => res.send({
    status: 'Ok',
    data: result
  })).catch(error => res.status(500).send({ status: 'Error', message: error }));

};

const confirmTasks = async (req: Request, res: Response) => {
  const checkConfirmTask = () => {
    return new Promise(async (resolve, reject) => {
      try {

        let dataBody = req.body; // Cambiar para que coja el email del usuario logeado
        const findUser = await User.findOne({ email: dataBody.emailFamily }).select({ _id: 1, _idHome: 1 });
        const findTasks = await TasksModel.find({ name: dataBody.name, _idHome: findUser?._idHome }).select({ _id: 1 });
        const checkTasks = await PerformModel.findOne({
          _idUser: findUser?.id,
          _idTasks: findTasks[0]._id,
          dateAssigned: dataBody.dateAssigned
        }).select({ _id: 1 });

        if (checkTasks?._id) {
          const checkRealized = await PerformModel.findById({ _id: checkTasks?._id }).select({ perform: 1, _id: 0 });
          if (checkRealized?.perform !== true) {


            await PerformModel.findByIdAndUpdate(checkTasks?._id, {
              perform: true

            });
            resolve(res.send({
              status: 'Ok',
              data: 'Task realized'
            }));
          } else {
            reject(res.status(500).send({ status: 'Error', message: 'Update not possible' }));
          }

        } else {
          reject(res.status(500).send({ status: 'Error', message: 'Update not possible' }));
        }
      } catch (e) {
        reject(res.status(500).send({ status: 'Error', message: 'Update not possible' }));
      }
    });
  };
  checkConfirmTask().then(result => result).catch(error => error);
};


export default {
  createTasks,
  getTasks,
  assignTasks,
  confirmTasks

};
