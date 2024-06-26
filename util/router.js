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


router.get("/login", (req, res) => {
    routes.loginRedirect(req, res);
});

router.post("/login", upload.any(), (req, res) => {
    routes.login(req, res);
});

router.get("/register", (req, res) => {
    res.render("register", { message: "" });
});

router.post("/register", upload.any(), (req, res) => {
    routes.register(req, res);
});

router.get("/domains", authenticateToken, (req, res) => {
    routes.domain(req, res);
});

router.get("/settings", authenticateToken, (req, res) => {
    res.render("settings", { message: "" });
});

router.get("/verify", (req, res) => {
    routes.verify(req, res);
});

router.get("/logout", (req, res) => {
    routes.logout(req, res);
});

router.get("/staff", authenticateStaffToken, (req, res) => {
    routes.staff(req, res);
});

router.get("/mfa-setup", authenticateToken, (req, res) => {
    routes.mfa(req, res);
});

router.post("/password", authenticateToken, upload.any(), (req, res) => {
    routes.password(req, res);
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

router.get("/login/magic", (req, res) => {
    const key = req.query.key;
    if (!key) {
        return res.redirect("/login");
    }
    res.cookie("token", key, { httpsOnly: true });
    res.redirect("/domains");
});


module.exports = router;