const ENDPOINT = process.env.ENDPOINT;
module.exports = async (req, res) => {
    const user = req.user;
    const token = req.cookies.token;
    const data = ''
    res.render("staff", {user: user, domains: data})
}
    