const index = require("../routes/index");
const login = require("../routes/login");
const loginRedirect = require("../routes/loginRedirect");
const register = require("../routes/register");
const domain = require("../routes/domains");
const verify = require("../routes/verify");
const logout = require("../routes/logout");
const staff = require("../routes/staff");
const mfa = require("../routes/mfa");


module.exports = {
    index,
    login,
    loginRedirect,
    register,
    domain,
    verify,
    logout,
    staff,
    mfa
}