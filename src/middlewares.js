import bcrypt from "bcrypt";
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

export const validateLogin = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await connection.query(`SELECT * FROM users WHERE email=$1`, [email]);
    const hashedPassword = bcrypt.compareSync(password, user.rows[0]?.password || "");
    const session = await connection.query(`SELECT * from sessions WHERE user_id=$1`, [user.rows[0].id]);

    if (!user.rows[0] || !hashedPassword) {
        return res.sendStatus(401);
    }

    if (session.rows[0]) {
        return res.status(401).send({ message: "this account is already logged in" });
    }

    next();
};

export const validateUrl = (req, res, next) => {
    const { url } = req.body;
    const regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

    if (!regex.test(url)) {
        return res.sendStatus(401);
    }

    next();
};

export const authenticateUser = async (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
        return res.sendStatus(401);
    }

    const session = await connection.query(`SELECT * FROM sessions WHERE token=$1;`, [token]);
    const user = await connection.query(`SELECT * FROM users WHERE id=$1;`, [session.rows[0]?.user_id]);

    if (!user.rows[0]) {
        return res.sendStatus(401);
    }

    delete user.rows[0].password;

    req.user = user.rows[0];

    next();
};

export const authenticateUrl = async (req, res, next) => {
    const { id } = req.params;
    const user = req.user;

    const dtUrl = await connection.query(`SELECT * FROM urls WHERE id=$1;`, [id]);

    if (!dtUrl.rows[0]) {
        return res.sendStatus(404);
    }

    if (dtUrl.rows[0].user_id !== user.id) {
        return res.sendStatus(401);
    }

    next();
};