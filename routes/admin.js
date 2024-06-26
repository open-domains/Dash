const ENDPOINT = process.env.ENDPOINT;
module.exports = async (req, res) => {
    const user = req.user;
    const token = req.cookies.token;
    let data = ''
    if (!user.admin){
        return res.redirect("/domains?code=5");
    }
    try {
        const response = await fetch(`${ENDPOINT}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            }
        });
        data = await response.json();
        console.log(data)
    res.render("admin", {user: user, users: data, message: ''})

    } catch (error) {
        console.log(error)
        res.render("admin", {user: user, users: data, message: 'fetching bitches. Please try again later.'})
    }
}
    