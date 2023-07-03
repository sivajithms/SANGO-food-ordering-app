import express from "express";

//database model
import { FoodModel } from "../../database/allModels";
import { ValidateCategory, ValidateRestaurantId } from "../../validation/food";

const Router = express.Router(); 

/*
Route       /
Descri      Get all foods based on particular Restautants 
Params      _id
Access      Public  
Method      GET
*/

Router.get('/:_id', async (req, res) => {
    try {
        await ValidateRestaurantId(req.params)
        const { _id } = req.params
        const foods = await FoodModel.find({ restaurant: _id });
        return res.json({ foods })
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

/*
Route       /r
Descri      Get all foods based on particular Category
Params      category
Access      Public  
Method      GET
*/

Router.get('/r/:category', async (req, res) => {
    try {
        await ValidateCategory(req.params)
        const { category } = req.params;
        const foods = await FoodModel.find({
            category: { $regex: category, $option: 'i' }
        });
        return res.json({ foods });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
})

export default Router;