const index = require("../routes/index");
const login = require("../routes/login");
const register = require("../routes/register");
const domain = require("../routes/domains");
const verify = require("../routes/verify");

module.exports = {
    index,
    login,
    register,
    domain,
    verify
}