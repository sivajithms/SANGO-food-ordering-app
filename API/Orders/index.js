import express from 'express';

import { OrderModel } from '../../database/allModels';

const Router = express.Router();

/*
Route       /
Descri      Get all orders based on _id
Params      _id
Access      Public  
Method      GET
*/

Router.get('/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        const getOrders = await OrderModel.findOne({ user: _id });

        if (!getOrders) {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*
Route       /new
Descri      Add new order
Params      _id
Access      Public  
Method      POST
*/

Router.post('/new/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        const { orderDetails } = req.body;
        const addNewOrder = await OrderModel.findOneAndUpdate(
            {
                user: _id
            },
            {
                $push: { orderDetails: orderDetails }
            },
            { 
                new: true
            });

        return res.json({ order: orderDetails });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

export default Router;