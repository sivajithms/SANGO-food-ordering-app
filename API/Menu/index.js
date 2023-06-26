import express from 'express';

import { MenuModel, ImageModel } from '../../database/allModels';

const Router = express.Router();

/*
Route       /list
Descri      Get all menu of a particular restaurant
Params      _id
Access      Public  
Method      GET
*/

Router.get('/list/:_id',async(req,res)=>{
    try {
        const {_id} = req.params;
        const menus = await MenuModel.findOne(_id);
        return res.json(menus);
    } catch (err) {
        return res.status(500).json({error:err.message});
    }
});

/*
Route       /image
Descri      Get menu images based on id
params      _id
Access      Public  
Method      GET
*/

Router.get('/image/:_id', async (req,res)=>{
    try {
        const {_id} = req.params;
        const menus = await ImageModel.findOne(_id);
        return res.json(menus);
    } catch (err) {
        return res.status(500).json({error:err.message});
    }
})

export default Router;