


const jwt = require('jsonwebtoken');
const UserModel = require("../models/user");
const eventModel = require("../models/event");
const bcrypt =require('bcryptjs')



const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User is already exist, you can login', success: false });
        }
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Auth failed email or password is wrong';
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }

        
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }

        const jwtToken = jwt.sign(
            { email:user.email, _id:user._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        )

        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken,
                email,
                name: user.name
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}


   



//    const event = async (req,res)=>
//    {
//     try{

//         const{eventname,date,link,textarea}=req.body;
//         if(!eventname || !date || !link || !textarea){
//             return res.status(400).json({
//                 success:false,
//                 message:"allfield required"
//             })
//         }

//         //create event in db

//         // const event = new Event({
//         //     eventname,
//         //     textarea,
//         //     date,
//         //     link,
//         //   });
//         const response = await event.create({eventname,date,link,textarea});


//         //   await event.save();

//           //

//           res.status(201)
//             .json({
//                 message: "event created succesfully",
//                 success: true,
//                 date:response,
//             })


//     }
//     catch(eror)
//     {
//         res.status(500)
//             .json({
//                 message: "could not create server",
//                 success: false
//             })

//     }
//    }

const event = async (req, res) => {
    // try {
    //   const { eventname, textarea, date, link } = req.body;
  
    //   // Validate required fields
    //   if (!eventname || !textarea || !date || !link) {
    //     return res.status(400).json({ message: 'All fields are required' });
    //   }
  
    //   // Create new event
    //   const event = await Event.create({ eventname, textarea, date, link });
  
    // //   // Save to database
    // //   await event.save();
  
    //   // Respond with success message
    //   return res.status(201).json({
    //     message: 'Event created successfully',
    //     data:event,
    //   });
  
    // } catch (error) {
    //   console.error('Error creating event:', error);
    //   return res.status(500).json({
    //     message: 'Server error, could not create event',
    //   });
    // }

    try {
        //extract title and desxcription from reauest body
        console.log("req body ", req.body)
          const { eventname, textarea, date, link } = req.body; 
          const userid = req.user._id;
  
      // Validate required fields
      if (!eventname || !textarea || !date || !link ) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      console.log("Userid ", userid);

      const user = await UserModel.findById(userid);
      console.log("User ", user);

      if(!user){
        return res.status(400).json({
            message:"user not exist",
            success:false,
        })
      }
  
        //create a new Todo Obj and insert in DB
        const response = await eventModel.create({eventname, textarea, date, link, eventcreater:user._id});

        user.event.push(response._id);
        await user.save();
        //send a json response with a success flag

        console.log("Created Event : ", response);
        res.status(200).json(
            {
                success:true,
                response,
                message:'Entry Created Successfully'
            }
        );
}
catch(err) {
    console.error(err);
    console.log("Error",err);
    res.status(500)
    .json({
        success:false,
        data:"internal server error",
        message:err.message,
    })
}
  };
  
  

module.exports = {
    signup,
    login,
    event
}