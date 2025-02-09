import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { APIError } from './errorHandler';

const headers = ['body', 'params', 'query'];
const Validate = (Schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        headers.forEach((key) => {
            if (Schema[key]) {
                let validateShema = Schema[key].validate(req[key as keyof typeof req])
                if (validateShema.error) {
                    throw new APIError(validateShema.error.details[0])
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

const createUserValidator = Validate({
    body: Joi.object().required().keys({
        name: Joi.string().min(3).required(),
        nationalId: Joi.string().optional(),
        phone: Joi.string().required().min(10).max(14),
        mobile: Joi.string().optional().min(10).max(14),
        diagnostic: Joi.string().required(),
        notes: Joi.string().optional(),
    })
});

const createMaterialValidator = Validate({
    body: Joi.object().required().keys({
        name: Joi.string().min(3).required(),
        description: Joi.string().optional(),
        type: Joi.string().required().valid('file', 'link'),
        link: Joi.string().uri().required(),
        category: Joi.string().required(),
        subCategory: Joi.string().required(),
    })
})

const createInvitationValidator = Validate({
    body: Joi.object().required().keys({
        user: Joi.string().required(),
        material: Joi.array().required()
    })
})

export { createCategoryValidator, updateCategoryValidator, createSubCategoryValidator, createUserValidator, createMaterialValidator, createInvitationValidator };