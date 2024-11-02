import jwt from "jsonwebtoken";

const auth = async(req, res,next) =>{
    try {
        const token = req.header("Authorization").replace('Bearer ', '');
        if (!token) {
            return res.status(404).json({message:"Token is not found"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        console.log(error);
        
        res.status(400).json({ message: "some error is occured while authorization" });
    }
}


export default auth;