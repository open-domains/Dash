module.exports = async (req, res) => {
    const token = req.cookies.token;
    const password = req.body.password;
    const confirmPassword = req.body.cpassword;

    if (!password || !confirmPassword) {
        return res.render("settings", { message: "Missing password." });
    }

    if (password !== confirmPassword) {
        return res.render("settings", { message: "Passwords do not match." });
    }

    const data = {
        "password": password,
    };

    const response = await fetch("https://api.open-domains.net/password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
        },
        body: JSON.stringify(data),
    });

    console.log(response.body);

    if (response) {
        if (response.status === 400) {
            return res.render("settings", { message: "Invalid password." });
        }
        if (response.status === 500) {
            return res.render("settings", { message: "Internal server error." });
        }
        if (response.status === 200) {
            return res.render("settings", { message: "Password updated." });
        }
    } else {
        return res.render("settings", { message: "Internal server error." });
    }
}