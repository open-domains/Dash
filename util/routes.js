const index = require("../routes/index");
const domain = require("../routes/domains");
const logout = require("../routes/logout");
const staff = require("../routes/staff");
const edit = require("../routes/edit");
const admin = require("../routes/admin");
const adminUser = require("../routes/adminUser");


module.exports = {
    index,
    domain,
    logout,
    staff,
    edit,
    admin,
    adminUser
}