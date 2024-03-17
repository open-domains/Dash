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


module.exports = router;