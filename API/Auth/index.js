import express from 'express';

import { UserModel } from '../../database/allModels';

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
        await UserModel.findEmailAndPhone(req.body.credentials);

        //DB
        const newUser = await UserModel.create(req.body.credentials)

        //JWT token
        const token = newUser.generateJwtToken();

        return res.status(200).json({ token });

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
});


export default Router;
