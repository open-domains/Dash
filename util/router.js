const { Router } = require("express");
const { authenticateToken, authenticateStaffToken } = require("./jwt");

const bodyParser = require("body-parser");
const multer = require('multer');
const upload = multer();



const router = Router();
const routes = require("./routes");

router.get("/", async (req, res) => {
    routes.index(req, res);
});

router.get("/profile", authenticateToken, (req, res) => {
    res.json(req.user); // Access the decoded user object from the request
});



router.get("/domains", authenticateToken, (req, res) => {
    routes.domain(req, res);
});

router.get("/settings", authenticateToken, (req, res) => {
    res.render("settings", { message: "" });
});


router.get("/logout", (req, res) => {
    routes.logout(req, res);
});

router.get("/staff", authenticateStaffToken, (req, res) => {
    routes.staff(req, res);
});



router.get("/edit/", authenticateToken, (req, res) => {
    routes.edit(req, res);
});

router.get("/admin/", authenticateStaffToken, (req, res) => {
    routes.admin(req, res);
});

router.get("/admin/users", authenticateStaffToken, (req, res) => {
    routes.adminUser(req, res);
});

router.get("/admin/del", authenticateStaffToken, (req, res) => {
    routes.adminUser(req, res);
});



module.exports = router;