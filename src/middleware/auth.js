const jwt = require("jsonwebtoken")

const tokenCheck = (token) =>{
    return jwt.verify(token, 'something', (err, decoded) => {
        if (err) {
            // Handle invalid tokens
            console.error(err);
            return false
        } else {
            // Access the decoded data
            return true
        }
        });
}

const verifyToken= (req, res, next)=>{
    const path = req.path;
    if(path == "/register" || path == "/login"){
        next()
        return
    }

    let token = req.headers.token;
    token = token?.split(" ")[1]
    if(token && tokenCheck(token))
        next()
    else{
        res.status(401).json({
            message: "Invalid Token"
        }) 
    }
        
}

module.exports = verifyToken;