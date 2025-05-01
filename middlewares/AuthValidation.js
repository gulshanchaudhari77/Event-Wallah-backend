// const joi = require("joi");
// const { schema } = require("../models/user");

// const signupValidation = (req,res,next)=>{
//        const Schema = joi .object ({
//         name : joi.string().min(3).max(100).reqiored(),
//         email : joi.string().min(3).max(100).reqiored(),
//         password : joi.string().min(4).max(100).reqiored(),


//        });

//        const{error}=Schema.validate(req.body);

//        if(error){
//         return res.status(400).json({
//             success:false,
//             message:"bad request",
//         })
//        }
//        next();

// }



// const loginValidation = (req,res,next)=>{
//     const Schema = joi .object ({
    
//      email : joi.string().min(3).max(100).reqiored(),
//      password : joi.string().min(4).max(100).reqiored(),


//     });

//     const{error}=Schema.validate(req.body);

//     if(error){
//      return res.status(400).json({
//          success:false,
//          message:"bad request",
//      })
//     }
//     next();

// }

// module.exports =
// {
//     signupValidation,
//     loginValidation
// }


const Joi = require('joi');

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()

    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400)
            .json({ message: "Bad request", error })
    }
    next();
}
const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400)
            .json({ message: "Bad request", error })
    }
    next();
}

const eventValidation = (req, res, next) => {
    const schema = Joi.object({
        eventname: Joi.string().min(3).max(100).required(),
        textarea: Joi.string().min(10).max(500).required(),
        date: Joi.date().required(),
        link: Joi.string().uri().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400)
            .json({ message: "Bad request", error: error.details[0].message });
    }

    next();
}


module.exports = {
    signupValidation,
    loginValidation,
    eventValidation
}