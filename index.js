require("dotenv").config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

//API
import Auth from './API/Auth'

//database connection
import connectDB from './database/connection'

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());
app.use(helmet());

app.get('/', (req, res) => {
    res.json('hii');
})

app.listen(port, () => {
    connectDB()
    .then(() => console.log('server started at port', port))
    .catch((err)=>console.log('DB connection failed',err))
})