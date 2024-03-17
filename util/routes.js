const index = require("../routes/index");
const login = require("../routes/login");
const loginRedirect = require("../routes/loginRedirect");
const register = require("../routes/register");
const domain = require("../routes/domains");
const verify = require("../routes/verify");


module.exports = {
    index,
    login,
    loginRedirect,
    register,
    domain,
    verify
}