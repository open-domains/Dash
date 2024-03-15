const ENDPOINT = process.env.ENDPOINT;
async function authenticateToken(req, res, next) {
    //get the token from the Auth cookie
    const token = req.cookies['token'];

    if (token == null) {
        return res.sendStatus(401); // Unauthorized if token is not provided
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
        return res.sendStatus(403); // Forbidden if token is invalid
    } else {
        let user = await response.json();
        // make the first letter of the username uppercase
        user.username = user.username.charAt(0).toUpperCase() + user.username.slice(1);
        req.user = user;
        next();
    }
}

module.exports = { authenticateToken }