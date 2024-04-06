const index = require("../routes/index");
const login = require("../routes/login");
const loginRedirect = require("../routes/loginRedirect");
const register = require("../routes/register");
const domain = require("../routes/domains");
const verify = require("../routes/verify");
const logout = require("../routes/logout");
const staff = require("../routes/staff");
const mfa = require("../routes/mfa");
const password = require("../routes/password");
const edit = require("../routes/edit");
const admin = require("../routes/admin");


module.exports = {
    index,
    login,
    loginRedirect,
    register,
    domain,
    verify,
    logout,
    staff,
    mfa,
    password,
    edit,
    admin
}