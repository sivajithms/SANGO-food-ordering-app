import express from 'express';

import { UserModel } from '../../database/allModels';

const Router = express.Router();

/*
Route       /
Descri      Get an user data
Params      _id
Access      Public  
Method      GET
*/

Router.get('/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        const getUsers = await UserModel.findById(_id);

        if (!getUsers) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.json({ user: getUsers });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*
Route       /update
Descri      Update an user data
Params      userId
Body        user data
Access      Public  
Method      PUT
*/

Router.put('/update /:userid', async (req, res) => {
    try {
        const { userId } = req.params;
        const { userData } = req.body;
        const updateUserData = await UserModel.findByIdAndUpdate(
            userId,
            {
                $set: userData
            },
            {
                new: true
            }
        );

        return res.json({ user: updateUserData });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default Router;