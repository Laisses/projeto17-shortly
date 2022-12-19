import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { connection } from "./database.js";

export const addNewUser = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    await connection.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, hashedPassword]);

    res.sendStatus(201);
};

export const login = async (req, res) => {
    const { email } = req.body;
    const token = uuid();

    const user = await connection.query(`SELECT * FROM users WHERE email=$1`, [email]);

    await connection.query(`INSERT INTO sessions (token, user_id) VALUES ($1, $2);`, [token, user.rows[0].id]);

    res.status(200).send(token);
}