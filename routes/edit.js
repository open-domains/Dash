const ENDPOINT = process.env.ENDPOINT;
module.exports = async (req, res) => {
    const domain = req.query.domain;
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
    // check if user is the owner of the domain
    let owner = false;
    for (let i = 0; i < data.length; i++){
        if (data[i]._id == domain){
            owner = true;
        }
    }
    if (!owner){
        return res.redirect("/domains?code=4");
    }
    res.render("edit", {user: user, domain: domain, message: ""});
}
