module.exports = async (req, res) => {
    let user = req.user;
    if (!user.admin){
        return res.redirect("/domains?code=5");
    }
    let data = ''
    try {
        const response = await fetch(`${ENDPOINT}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            }
        });
        data = await response.json();
        res.render("adminUser", {user: user, users: data, message: '', domain: ''})
    }
    catch (error) {
        console.log(error)
        res.render("adminUser", {user: user, users: data, message: 'fetching bitches. Please try again later.', domain: ''})
    }
}
