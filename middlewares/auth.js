const jwt = require("jsonwebtoken")
require("dotenv").config();


exports.auth = (req,res,next)=>

    //yaha token verify ho raha hai
{
    try{
        //extract jwt token
        // console.log("c00kies",req?.cookies?.token);
        // console.log("body",rew.body?.token);
        console.log("resf",req.header("Authorization"));

        const token = req?.cookies?.token || req?.body?.token || req?.header("Authorization")?.replace("Bearer ", "")?.trim();
        console.log("token : ",token);

        if(!token || token===undefined)
        {
            return res.status(401).json({
                success:false,
                message:"token not avaialbele"
            })
        }


        //varify the token
        try{
            const payload = jwt.verify(token,process.env.JWT_SECRET);
            console.log("payload", payload);
            req.user=payload;
        }
        catch(error)
        {
            return res.status(401).json({
                success:false,
                message:"token invalid",
            })
        }
        next();
    }
    catch(error)
    {
        console.log("Error ", error);
        return res.status(401).json({
            success:false,
            message:"something went wrong while verifing the token",
        })

    }

}