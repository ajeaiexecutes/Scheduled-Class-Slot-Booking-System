import jwt from "jsonwebtoken"

export const authMiddleware=(req,res,next)=>{
    try {
        const authHeader=req.headers.authorization;
        console.log(req.headers);
        

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }

        const token=authHeader.split(" ")[1];

        const decode=jwt.verify(token,process.env.JWT_SECRET);
        //console decode to know whts inside
        console.log("decode",decode)

        req.user={
            userId:decode.userId
        }

        next()
    } catch (error) {
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
} 