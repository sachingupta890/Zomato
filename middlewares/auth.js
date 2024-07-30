import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header is missing", success: false });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token is missing", success: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
        req.user = decoded;
        next(); 
    } catch (err) {
        return res.status(401).json({ message: "Invalid token", success: false });
    }
};

export default auth;
