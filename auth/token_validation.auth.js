const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if(token){
            token = token.slice(7);
            verify(token, "qwe1234", (err, decoded) => {
                if(err){
                    res,json({
                        status: 404,
                        success: false,
                        message: `Invalid token.`, 
                    });
                }
                else{
                    next();
                }
            });
        }
        else{
            res.json({
                status: 405,
                success: false,
                message: "Unauthorized user. Access denied...",
            });
        }
    }
}