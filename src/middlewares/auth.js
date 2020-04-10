import jwt from 'jsonwebtoken';

const isValidHost = (req, res, next) => {
  const validHost = ['localhost']; // es un array por si usamos más de un host
  if (validHost.includes(req.hostname)) {
    next();
  } else {
    res.status(403).send({ status: 'ACCESS_DENIED' });
  }
};

const isAuth = (req, res, next) => {
  try {
    const { token } = req.headers; // el token me lo trae las cabezeras
    if (token) {
      const data = jwt.verify(token, process.env.JWT_SECRET); // verifica que el token es válido
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

export { isValidHost, isAuth };
