import express, { Application } from 'express'; // para tyscript podemos hace una importación parcial para poner el tipo
import bodyParser from 'body-parser';
import dotEnv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes/routes';

dotEnv.config();

// sobre escribiendo el interface Reques de expresss
declare global {
  namespace Express {
    export interface Request {
      sessionData: any;
    }
  }
}

const app: Application = express();

//nos ayuda a parsear a json lo que llegue por POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes(app);



// hemos puesto ! en env.... porque así le aseguramos a ts que siempre será un string
const init = async () => {
  await mongoose.connect(process.env.MONGO!, {
    dbName: 'pruebasDB',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
init()
  .then(() => {
    console.log('Connected to Mongodb');
    app.listen(process.env.PORT, () => {
      console.log('Connected and listen port:3000');
    });
  })
  .catch((error) => {
    console.log('Mongodb error', error);
  });
