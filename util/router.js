const { Router } = require("express");
const { authenticateToken } = require("./jwt");

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
    res.render("login");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/domains", authenticateToken, (req, res) => {
    routes.domain(req, res);
});


module.exports = router;