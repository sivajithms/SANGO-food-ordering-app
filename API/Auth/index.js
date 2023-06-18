import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { UserModel } from '../../database/allModels';

const Router = express.Router();

/*
Router          /signup
Descrip         signup with email and password
Params          none
Access          public 
Method          POST
*/

Router.get('/signup', async (req, res) => {
    try {
        const { email, password, fullname, phoneNumber } = req.body.credentials;

        //check whether email or phone number exists
        const checkUserByEmail = await UserModel.findOne({ email });
        const checkUserByPhone = await UserModel.findOne({ phoneNumber });

        if (checkUserByEmail || checkUserByPhone) {
            return res.json({ error: "user already exists" });
        }

        //hashing and salting
        const bcryptSalt = await bcrypt.genSalt(8);
        const hashPassword = await bcrypt.hash(password, bcryptSalt);

        //DB
        await UserModel.create({
            ...req.body.credentials,
            password: hashPassword
        })

        //JWT token
        const token = jwt.sign({ user: { fullname, email } }, "SangoApp")

        return res.status(200).json({token});

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})