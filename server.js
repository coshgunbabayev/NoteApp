import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { v2 as cloudinary } from 'cloudinary';

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

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET,
    secure: true
});

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});

import connection  from './database/connection.js';
import updateDocuments from './database/update.js';
connection();
updateDocuments();

import notify from './middlewares/notify.js';
import pageRoute from './routes/pageRoute.js';
import userRoute from './routes/userRoute.js';
import noteRoute from './routes/noteRoute.js';
import settingsRoute from './routes/settingsRoute.js';

app.use('/',notify, pageRoute);
app.use('/api/user',notify, userRoute);
app.use('/api/note',notify, noteRoute);
app.use('/api/settings',notify, settingsRoute);