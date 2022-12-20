import * as h from "./handlers.js";
import * as m from "./middlewares.js";
import * as s from "./schemas.js";


export const routes = app => {

    app.post("/signup", m.validate(s.user), m.validateEmail, m.asyncError(h.addNewUser));

    app.post("/signin", m.validate(s.userLogin), m.validateLogin, m.asyncError(h.login));

    app.post("/urls/shorten", m.validate(s.url), m.validateUrl, m.authenticate, m.asyncError(h.addNewUrl));
};