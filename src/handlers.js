import bcrypt from "bcrypt";
import { nanoid } from 'nanoid'
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

export const addNewUrl = async (req, res) => {
    const { url } = req.body;
    const user = req.user;
    const shortUrl = nanoid();

    await connection.query(`INSERT INTO urls (user_id, original_url, short_url, view_count) VALUES ($1, $2, $3, $4);`, [user.id, url, shortUrl, 0]);

    res.status(201).send({ shortUrl });
};

export const selectUrl = async (req, res) => {
    const { id } = req.params;

    const url = await connection.query(`SELECT * FROM urls WHERE id=$1`, [id]);

    if (!url.rows[0]) {
        return res.sendStatus(404);
    }

    res.status(200).send({
        id: url.rows[0].id,
        shortUrl: url.rows[0].short_url,
        url: url.rows[0].original_url
    });
};

export const openUrl = async (req, res) => {
    const { shortUrl } = req.params;

    const dtUrl = await connection.query(`SELECT * FROM urls WHERE short_url=$1;`, [shortUrl]);

    if (!dtUrl.rows[0]) {
        return res.sendStatus(404);
    }

    const count = dtUrl.rows[0].view_count;
    const url = dtUrl.rows[0].original_url;
    const id = dtUrl.rows[0].id;

    await connection.query(`UPDATE urls SET view_count=$1 WHERE id=$2;`, [count + 1, id]);

    res.redirect(url);
};

export const deleteUrl = async (req, res) => {
    const { id } = req.params;

    await connection.query(`DELETE FROM urls WHERE id=$1;`, [id]);

    res.sendStatus(204);
};

export const selectUser = async (req, res) => {
    const user = req.user;

    const dtUrls = await connection.query(`SELECT * FROM urls WHERE user_id=$1;`, [user.id]);

    const visitCount = dtUrls.rows
        .map(url => url.view_count)
        .reduce((acc, curr) => acc + curr, 0);

    const urls = dtUrls.rows.map(url => {
        return {
            id: url.id,
            shortUrl: url.short_url,
            url: url.original_url,
            visitantCount: url.view_count
        }
    });

    res.status(200).send({
        id: user.id,
        name: user.name,
        visitCount,
        shortenedUrls: [...urls]
    })
};

export const ranking = async (_req, res) => {
    const rank = await connection.query(`
        SELECT
            users.id,
            users.name,
            COUNT(urls.short_url) AS "linksCount",
            SUM(COALESCE(urls.view_count, 0)) AS "visitCount"
        FROM
            users
        LEFT JOIN
            urls
        ON
            users.id = urls.user_id
        GROUP BY
            users.name,
            users.id
        ORDER BY
            "linksCount" DESC
        LIMIT
            10;
    `);

    res.status(200).send(rank.rows);
};













