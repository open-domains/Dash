module.exports = async (req, res) => {
    const redirect = req.query.redirect;
    return res.render("login", { redirect, message: ""});
}