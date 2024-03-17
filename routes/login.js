module.exports = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const redirect = req.query.redirect;

    if (!username || !password) {
        return res.render("login", { message: "Missing username or password." });
    }
    const data = {
        "username": username,
        "password": password,
    };
    const response = await fetch("https://api.open-domains.net/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const authd = await response.json();
    if (authd.message) {
        return res.render("login", { message: authd.message });
    }
    res.cookie("token", authd.accessToken, { httpsOnly: true });
    if (redirect) {
        return res.redirect(redirect);
    } else {
        return res.redirect("/domains");
    }
}