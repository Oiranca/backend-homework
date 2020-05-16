import jwt from 'jsonwebtoken';
import {Request,Response,NextFunction} from 'express'

const isValidHost = (req: Request, res:Response, next:NextFunction):void => {
  const validHost = ['localhost']; // es un array por si usamos más de un host
  if (validHost.includes(req.hostname)) {
    next();
  } else {
    res.status(403).send({ status: 'ACCESS_DENIED' });
  }
};

const isAuth = (req: Request, res:Response, next:NextFunction):void =>  {
  try {
    const { token } = req.headers; // el token me lo trae las cabeceras
    if (token) {
      // le ponemos any porqeu sabemos que data es object
      const data :any = jwt.verify(token as string, process.env.JWT_SECRET!); // verifica que el token es válido
      // podemos escribir en el reques sin usar los reservados, nos sirve para verifar usuario para cargar el perfil con userid
      //ya que está validado con el token
      req.sessionData = { userId: data.userId, role: data.role };
      next();
    } else {
      //creamos nuestro error personalizado
      throw {
        code: 403,
        status: 'ACCESS_DENIED',
        message: 'Missing header token',
      };
    }
  } catch (e) {
    res.status(e.code || 500).send({
      status: e.status || 'ERROR',
      message: e.message,
    });
  }
};

const isAdmin = (req: Request, res:Response, next:NextFunction):void => {
  try {
    const { role } = req.sessionData; // el role nos lo trae el sessionData que creamos en auth
    console.log(`role ${role}`);

    if (role!==100){
      throw {
        code:403,
        status:'ACCESS_DENIED',
        message:'Invalid role'
      };
    }
    next();

  } catch (e) {
    res.status(e.code || 500).send({
      status: e.status || 'ERROR',
      message: e.message,
    });
  }
};

export { isValidHost, isAuth,isAdmin };
