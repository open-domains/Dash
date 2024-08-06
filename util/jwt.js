const ENDPOINT = process.env.ENDPOINT;
async function authenticateToken(req, res, next) {
    // get a token from the query if it exists
    const qtoken = req.query.token;
    if (qtoken) {
        res.cookie('token', qtoken, { maxAge: 900000, httpOnly: true });
    }
    //get the token from the Auth cookie
    const token = req.cookies['token'];

    if (token == null) {
        let redirect = req.originalUrl;
        return res.redirect(`https://github.com/login/oauth/authorize?client_id=37ca1e9a943e32b00ac8&scope=public_repo%20user:email&redirect_uri=https://api.open-domains.net/__/auth/handler?redirect=${redirect}`);
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

async function authenticateStaffToken(req, res, next) {
    //get the token from the Auth cookie
    const token = req.cookies['token'];
    if (token == null) {
        let redirect = req.originalUrl;
        return res.redirect(`https://github.com/login/oauth/authorize?client_id=37ca1e9a943e32b00ac8&scope=public_repo%20user:email&redirect_uri=https://api.open-domains.net/__/auth/handler?redirect=${redirect}`);
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
        if (user.staffMember) {
            next();
        } else {
            return res.redirect(`/domains?code=5`);
        }
        
    }
}



module.exports = { authenticateToken, authenticateStaffToken }