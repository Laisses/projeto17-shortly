import { connection } from "./database.js";
import { validator } from "./schemas.js";

export const asyncError = handlerFn => async (req, res, next) => {
    try {
        await handlerFn(req, res, next);
    } catch (err) {
        console.warn(err);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
};

export const validate = schema => (req, res, next) => {
    const payload = req.body;
    const { error } = validator(schema, payload);

    if (error) {
        const errors = error.details.map(detail => detail.message);
        return res.status(422).send({
            message: "Unprocessable Entity",
            errors,
        });
    }

    next();
};

export const validateEmail = async (req, res, next) => {
    const { email } = req.body;

    const emailRegistered = await connection.query(`SELECT * FROM users WHERE email=$1;`, [email]);

    if (emailRegistered.rows[0]) {
        return res.sendStatus(409);
    }

    next();
};