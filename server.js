import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

dotenv.config()

const app = express();
const port = process.env.PORT || 8000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});

import connection  from './database/connection.js';
connection();

import notify from './middlewares/notify.js';
import pageRoute from './routes/pageRoute.js';
import userRoute from './routes/userRoute.js';
import noteRoute from './routes/noteRoute.js';

app.use('*', notify);
app.use('/', pageRoute);
app.use('/api/user', userRoute);
app.use('/api/note', noteRoute);