import express from 'express';

import { UserModel } from '../../database/allModels';
import passport from 'passport';
import { ValidateSignin, ValidateSignup } from '../../validation/auth';

//validation

const Router = express.Router();

/*
Router          /signup
Descrip         signup with email and password
Params          none
Access          public 
Method          POST
*/

Router.post('/signup', async (req, res) => {
    try {
        await ValidateSignup(req.body.credentials);

        await UserModel.findEmailAndPhone(req.body.credentials);

        //DB
        const newUser = await UserModel.create(req.body.credentials);

        //JWT token
        const token = newUser.generateJwtToken();

        return res.status(200).json({ token });

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
});

/*
Router          /signin
Descrip         signin with email and password
Params          none
Access          public 
Method          POST
*/

Router.post('/signin', async (req, res) => {
    try {
        await ValidateSignin(req.body.credentials);

        const user = await UserModel.findByEmailAndPassword(req.body.credentials)

        //JWT token
        const token = user.generateJwtToken();

        return res.status(200).json({ token, status: "success" });

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
});

/*
Router          /google
Descrip         Google signin 
Params          none
Access          public 
Method          GET
*/

Router.get('/google', passport.authenticate('google', {
    scope: [
        'profile',
        'email'
    ]
})
);

/*
Router          /google/callback
Descrip         Google signin callback
Params          none
Access          public 
Method          GET
*/

Router.get('/google/callback', passport.authenticate('google',
    { failureRedirect: '/' }),
    (req, res) => {
        // Handle successful authentication
        // res.redirect('/home');
        return res.json({ token: req.session.passport.user.token });
    });

export default Router;
