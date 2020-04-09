import express from 'express';
import bodyParser from 'body-parser';

import routes from './routes/routes';

const app = express();

app.disable('x-powered-by');

//nos ayuda a parsear a json lo que llegue por POST

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

routes(app);

app.listen(3000, () => {
    console.log('Connected and listen port:3000');
});
