import express from 'express';

import routes from './routes/routes';


// Create a new express application instance

const app = express();
app.disable('x-powered-by')

routes(app);

app.listen(3000, () => {
  console.log('Connected and listen port:3000');
});
