import {Request,Response} from 'express';


const updateHome = (req:Request, res:Response) => {
  res.status(200).json({
    groupStatus: 'Update',
  });
};

export default {
  updateHome,
};
