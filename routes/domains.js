const e = require("express");

const ENDPOINT = process.env.ENDPOINT;
module.exports = async (req, res) => {
    const user = req.user;
    const token = req.cookies.token;
    const code = req.query.code;
    let data = await fetch(ENDPOINT + `/domains` , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
    });
    data = await data.json();

    if (code){
        if (code == 1){
            return res.render("domain", {user: user, domains: data, message: "System error, please try again later"});
        }
        if (code == 2){
            return res.render("domain", {user: user, domains: data, message: "Domain not found"});
        }
        if (code == 3){
            return res.render("domain", {user: user, domains: data, message: "Domain already exists"});
        }
        if (code == 4){
            return res.render("domain", {user: user, domains: data, message: "You do not have permission to edit this domain"});
        }
        if (code == 5){
            return res.render("domain", {user: user, domains: data, message: "You do not have permission to access this page"});
        } else {
            return res.render("domain", {user: user, domains: data, message: ""});
        }
    } else {
        return res.render("domain", {user: user, domains: data, message: ""});
    }


}
    