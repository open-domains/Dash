const twofactor = require("node-2fa");
module.exports = async (req, res) => {
    const user = req.user;
    const username = user.username;
    const newSecret = twofactor.generateSecret({ name: "OPEN DOMAINS", account: username });
    console.log(newSecret);
    res.render("mfaSetup", {message: '', user: user, secret: newSecret.secret, qrcode: newSecret.qr});
}
