import Joi from "Joi";

export const ValidateRestaurantId = (resId) => {

    const Schema = Joi.object({

        _id: Joi.string().required()
    });

    return Schema.validateAsync(resId);

}

export const ValidateCategory = (category) => {

    const Schema = Joi.object({
        category: Joi.string().required()
    });

    return Schema.validateAsync(category);

}