import express from 'express';

import { ReviewModel } from '../../database/allModels';

const Router = express.Router();

/*
Route       /new
Descri      Add new review
Params      none
Body        Review object
Access      Public  
Method      POST
*/

Router.post('/new', async (req, res) => {
    try {
        const { reviewData } = req.body;

        await ReviewModel.create(reviewData);

        return res.json({ review: 'succesfully created review' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*
Route       /delete
Descri      Delete a review
Params      _id
Access      Public  
Method      DELETE
*/

Router.delete('/delete/:_id', async (req, res) => {
    try {
        const { _id } = req.params;

        await ReviewModel.findByIdAndDelete(_id);

        return res.json({ review: 'succesfully deleted review' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default Router;