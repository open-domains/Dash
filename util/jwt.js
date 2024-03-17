const ENDPOINT = process.env.ENDPOINT;
async function authenticateToken(req, res, next) {
    //get the token from the Auth cookie
    const token = req.cookies['token'];

    if (token == null) {
        let redirect = req.originalUrl;
        return res.redirect(`/login?redirect=${redirect}`);
    }

    // Verify the token
    const response = await fetch(ENDPOINT + `/profile` , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
    });

    if (response.status !== 200) {
        let redirect = req.originalUrl;
        return res.redirect(`/login?redirect=${redirect}`);
    } else {
        let user = await response.json();
        // make the first letter of the username uppercase
        user.username = user.username.charAt(0).toUpperCase() + user.username.slice(1);
        req.user = user;
        next();
    }
}

module.exports = { authenticateToken }