import Joi from "joi";

export const validator = (schema, payload) =>
    schema.validate(payload, { abortEarly: false });

export const user = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.ref("password"),
});

export const userLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const url = Joi.object({
    url: Joi.string().uri().required()
});