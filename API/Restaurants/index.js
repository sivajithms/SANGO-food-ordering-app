import { RestaurantModel } from "../../database/allModels";
import express from "express";

const Router = express.Router();

/*
Route       /
Descri      Get all Restautants details
Params      None
Access      Public  
Method      GET
*/

Router.get('/', async (req, res) => {
    try {
        const { city } = req.query
        const restautants = await RestaurantModel.find({ city });
        return res.json({ restautants });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

/*
Route       /
Descri      Get all Restautants details
Params      _id
Access      Public  
Method      GET
*/

Router.get('/:id', async (req, res) => {
    try {
        const { _id } = req.params;
        const restaurant = await RestaurantModel.findById(_id);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurnat not found' });
        }
        return res.json({ restaurant });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

/*
Route       /search
Descri      Get Restautants details search
Params      none
Body        searchString
Access      Public  
Method      GET
*/

Router.get('/search', async (req, res) => {
    try {
        const { searchString } = req.body;
        const restaurants = await RestaurantModel.find({
            name: { $regex: searchString, $option: 'i' }
        });
        return res.json({ restaurants });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

export default Router;