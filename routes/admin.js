const ENDPOINT = process.env.ENDPOINT;
module.exports = async (req, res) => {
    const user = req.user;
    const token = req.cookies.token;
    const data = ''
    if (!user.admin){
        return res.redirect("/domains?code=5");
    }
    res.render("admin", {user: user, domains: data, message: ''})
}
    