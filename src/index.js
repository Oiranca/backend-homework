import express from 'express';
import bodyParser from 'body-parser';
import dotEnv from 'dotenv';
import mongoose from 'mongoose';

import routes from './routes/routes';

dotEnv.config();
const app = express();

app.disable('x-powered-by');

//nos ayuda a parsear a json lo que llegue por POST

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes(app);

const init = async () => {
  await mongoose.connect(process.env.MONGO, {
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
