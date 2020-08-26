import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../model/user';
import jwt from 'jsonwebtoken';
import registerHome from '../model/group';
import performsTasks from '../model/tasksPerform';
import { rejects } from 'assert';
import { type } from 'os';

// TODO : Buscar y capturar con switch los errores para no pasar datos que no debemos en el mensaje
const expiresIn = 60 * 100;  //TODO: Mirar que se anule el token al hacer logout

const login = async (req: Request, res: Response) => {

  const { email, password } = req.body;
  const loginUser = () => {
    return new Promise(async (resolve, reject) => {
      interface error {
        code: number;
        status: string;

      };
      const user = await User.findOne({ email });
      if (user) {

        const isCorrect = await bcrypt.compare(password, user.password);
        if (isCorrect) {
          const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET!,
            { expiresIn: expiresIn } // tiempo que tiene de validez el token
          );
          resolve(token);

        } else {

          let invalidPassword: error = {
            code: 403,
            status: 'INVALID_PASSWORD'
          };
          reject(invalidPassword);

        }
      } else {

        let invalidUser: error = {
          code: 401,
          status: 'USER_NOT_FOUND'
        };

        reject(invalidUser);

      }
    });

  };
  loginUser().then(token => res.send({ status: 'ok', data: { token, expiresIn } })).catch(error => {
    res.status(error.code).send({ status: error.status });


  });


};
const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, tasks } = req.body;

    const hash = await bcrypt.hash(password, 15);
    let _idHome = await User.findOne({ email: req.body.adminEmail }).select({ _idHome: 1, _id: 0 });

    if (_idHome !== null) {

      // se usa await para primero crear el usuairo y luego enviar la respuesta
      await User.create({
        name, // Cuando el atributo tiene el mismo nombre que en el esquema
        email,
        password: hash,
        role: 50,
        _idHome: _idHome?._idHome,
        tasks
      });
    } else {

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
        _idHome: _idHome?._id,
        tasks
      });
    }

    res.send({ status: 'Ok', message: 'User Create' });
  } catch (e) {


    res.status(500).send({ status: 'Error', message: 'E11000' });
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
      family = await User.find({ _idHome: idForSearch!._idHome }).select({ name: 1, _id: 0, password: 1, email: 1 });
      res.send({ status: 'Ok', data: family });
    } else if (isAdmin === 50) {
      family = await User.find({ _id: idUserSearch }).select('name _id _idHome tasks');
      res.send({ status: 'Ok', data: family });
    }
  } catch (e) {

    res.status(500).send({ status: 'Error', message: e.message });
  }
};


const getReport = async (req: Request, res: Response) => {

  const printReport = () => {
    return new Promise(async (resolve, reject) => {

      let reportUsers, userPerforms;
      const isAdmin = req.sessionData.role;
      const idUserSearch = req.sessionData.userId;
      const dayToMilliSecond = 1000 * 60 * 60 * 24;
      // Provisional para hacer pruebas
      let dateFromTask = '2001-01-01';
      let dateToTask = '2001-01-31';
      let totalTasks= new Map<number, Object>();

      //TODO hacer el recorrido para que busque día por día  y lo guarde en un map para
      if (isAdmin === 100) {
        const idForSearch = await User.findOne({ _id: idUserSearch }).select({ _idHome: 1, _id: 0 });
        reportUsers = await User.find({ _idHome: idForSearch!._idHome }).select({ name: 1, _id: 1 });

        if ((new Date(dateFromTask).getMonth() + 1) !== (new Date(dateToTask).getMonth() + 1)) {
          reject('Data only one month');
        } else {
          let dateFromMillisecondTask = new Date(dateFromTask).getTime();
          let dateToMillisecondTask = new Date(dateToTask).getTime();
          let totalDaySearch: number = ((dateToMillisecondTask - dateFromMillisecondTask) / dayToMilliSecond) + 1;


          for (let idUser of reportUsers) {
            let dateToSearch;

            for (let count: number = 0; count < totalDaySearch; count++) {
              let dateToDate = new Date(dateFromTask);
              let dateCount = dateToDate.getDay() + count;
              dateToSearch = dateToDate.getFullYear().toString() + (dateToDate.getMonth() < 9 ? '-0' + (dateToDate.getMonth() + 1).toString() : '-' + (dateToDate.getMonth() + 1).toString()) +
                (dateCount <= 9 ? '-0' + dateCount.toString() : '-' + dateCount.toString());

              userPerforms = await performsTasks.find({
                _idUser: idUser._id,
                dateAssigned: dateToSearch!
              }).select({ perform: 1, _idTasks: 1, _id: 0, _idUser: 1, dateAssigned: 1 });

              if (userPerforms.length>0){

                totalTasks.set(count, userPerforms[count])
              }








            }

            for (let [countKey,value] of totalTasks){
              console.log(`Key del Map ${ countKey } y valores ${value}`);
            }
            //userPerforms.length >= 0 ? resolve(totalTasks.entries()) : reject('Not found');
          }
        }
      } else if (isAdmin === 50) {
        reportUsers = await User.find({ _id: idUserSearch }).select('name tasks');
        res.send({ status: 'Ok', data: reportUsers });
      }


    });

  };

  printReport().then(result => res.send({
    status: 'Ok', data: result
  })).catch(error => res.status(500).send({ status: 'Error', messenger: error }));


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
