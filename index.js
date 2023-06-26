require("dotenv").config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import session from 'express-session';

//config 
import googleAuthConfig from './configs/google.config';

//API
import Auth from './API/Auth';
import Restaurant from './API/Restaurants';
import Food from './API/Food';
import Menu from './API/Menu'

//database connection
import connectDB from './database/connection'

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(session({ secret: 'key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

//passport configuration
googleAuthConfig(passport);

//for application routes
app.use('/auth', Auth);
app.use('/restaurant', Restaurant);
app.use('/food', Food);
app.use('/menu', Menu);

app.get('/', (req, res) => {
    res.json('hii');
});

app.listen(port, () => {
    connectDB()
        .then(() => console.log('server started at port', port))
        .catch((err) => console.log('DB connection failed', err))
});