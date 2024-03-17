module.exports = async (req, res) => {
    const { token } = req.query;
    if (!token) {
        return res.render("verify", { message: "Missing token.", pass: false });
    }
    const response = await fetch(`https://api.open-domains.net/verify?code=${token}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    if (response.status === 200) {
        return res.render("verify", { pass: true });
    } else {
        return res.render("verify", { pass: false });
    }
}