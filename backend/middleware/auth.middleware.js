const jwt = require('jsonwebtoken');

// FIX IS HERE: Added quotes around the fallback string
const JWT_SECRET = process.env.JWT_SECRET ;

function auth(req, res, next) {
    
    // 1. Get the token from the 'Authorization' header
    const authHeader = req.header('Authorization');

    // 2. Check if authHeader exists and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No valid token, authorization denied.' });
    }

    try {
        // 3. Extract just the token part (after "Bearer ")
        const token = authHeader.split(' ')[1];

        // 4. Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);

        // 5. Attach user to the request
        req.user = decoded.user;
        next(); // Move on to the route handler

    } catch (err) {
        res.status(401).json({ message: 'Token is not valid.' });
    }
}

module.exports = auth;