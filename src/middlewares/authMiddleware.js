import jwt from 'jsonwebtoken';
const identifyUser = (req, res, next) => {
    const token = req.cookies.JWT_TOKEN;
    
    if (!token) {
        res.status(401).json({
            message: "can not read token, user not authenticated"
        })
    }

    let decoded = null;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);

    } catch (error) {
        return res.status(401).json({
            message: "Invalid Token, Unauthorized"
        })
    }

    req.user = decoded;
    next();
}

export default identifyUser;