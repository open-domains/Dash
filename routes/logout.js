module.exports = async (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
}