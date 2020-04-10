import {Request,Response} from 'express';
import Group  from '../model/group';

const createHome = async (req:Request, res:Response) => {
  try {
    const { name } = req.body;
    console.log(name);

    await Group.create({
      name, // Cuando el atributo tiene el mismo nombre que en el esquema
    });

    res.send({ status: 'Ok', message: 'Home Create' });
  } catch (e) {
    // TODO : Buscar y capturar con switch los errores para no pasar datos que no debemos en el mensaje

    res.status(500).send({ status: 'Error', message: e.message });
  }
};

const deleteHome = (req:Request, res:Response) => {
  res.status(200).json({
    HomeStatus: 'Delete',
  });
};
const getHome = async (req:Request, res:Response) => {
  try {
    const home = await Group.find();
    res.send({ status: 'Ok', data: home });
  } catch (e) {
    // TODO : Buscar y capturar con switch los errores para no pasar datos que no debemos en el mensaje
    res.status(500).send({ status: 'Error', message: e.message });
  }
};
const updateHome = (req:Request, res:Response) => {
  res.status(200).json({
    groupStatus: 'Update',
  });
};

export default {
  createHome,
  deleteHome,
  getHome,
  updateHome,
};
