import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const headers = ['body', 'params', 'query'];
const Validate = (Schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        headers.forEach((key) => {
            if (Schema[key]) {
                let validateShema = Schema[key].validate(req[key as keyof typeof req])
                if (validateShema.error) {
                    throw new Error(validateShema.error.details[0].message)
                } else {
                    next()
                }
            }
        })
    }
};

const createCategoryValidator = Validate({
    body: Joi.object().required().keys({
        name: Joi.string().min(3).required(),
        description: Joi.string().optional(),
    })
});

const updateCategoryValidator = Validate({
    body: Joi.object().required().keys({
        name: Joi.string().min(3).optional(),
        description: Joi.string().optional(),
    })
});

const createSubCategoryValidator = Validate({
    body: Joi.object().required().keys({
        name: Joi.string().min(3).required(),
        description: Joi.string().optional(),
        category: Joi.string().required()
    })
});

export { createCategoryValidator, updateCategoryValidator, createSubCategoryValidator };