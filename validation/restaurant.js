import joi from 'Joi';

export const ValidateRestaurantCity = (restaurantObj) => {
    const Schema = joi.object({
        city : joi.string().required()
    });
    return Schema.validateAsync(restaurantObj);
}

export const ValidateRestaurantSearchString = (restaurantObj) => {
    const Schema = joi.object({
        searchString : joi.string().required()
    });
    return Schema.validateAsync(restaurantObj);
}