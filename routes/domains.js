const ENDPOINT = process.env.ENDPOINT;
module.exports = async (req, res) => {
    const user = req.user;
    const token = req.cookies.token;
    let data = await fetch(ENDPOINT + `/domains` , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
    });
    data = await data.json();
    res.render("domain", {user: user, domains: data})
}
    