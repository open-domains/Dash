module.exports = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.cpassword;
    const email = req.body.email;

    if (!username || !password || !confirmPassword || !email) {
        return res.render("register", { message: "Missing username, email, or password." });
    }

    if (password !== confirmPassword) {
        return res.render("register", { message: "Passwords do not match." });
    }

    const data = {
        "username": username,
        "password": password,
        "email": email,
    };

    const response = await fetch("https://api.open-domains.net/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (response) {
        if (response.status === 409) {
            return res.render("register", { message: "Username or email already exists." });
        }
        if (response.status === 400) {
            return res.render("register", { message: "Invalid username, password, or email." });
        }
        if (response.status === 500) {
            return res.render("register", { message: "Internal server error." });
        }
        if (response.status === 200) {
            return res.render("registered");
        }
    } else {
        return res.render("register", { message: "Internal server error." });
    }
}