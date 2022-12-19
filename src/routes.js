import * as h from "./handlers.js";
import * as m from "./middlewares.js";
import * as s from "./schemas.js";


export const routes = app => {

    app.post("/signup", m.validate(s.user), m.validateEmail, m.asyncError(h.addNewUser));
};