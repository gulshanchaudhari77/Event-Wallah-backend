const  eventModel = require("../models/event");
const User = require("../models/user")

exports.getdata = async(req,res)=>
{
    try{
        const {_id} = req.user;
        const userData = await User.findById(_id).populate("event");
        console.log("userData ", userData);

        const fetchdata = await eventModel.find({});
        res.status(200)
        .json({
            success:true,
            data:userData?.event,
            message:"entire user data is fetched",
        });

    }
    catch(error)
    {
        
        res.status(500)
        .json({
            success:false,
            
            message:'server  data not get eerror',
        })

    }
}

exports.getAllRegisterUser = async(req, res) => {
    try{
        const {eventId} = req.body;

        const user = await eventModel.findById(eventId).populate("user").populate("eventcreater").exec();

        if(!user){
            return res.status(500).json({
            success:false,
            message:'server  data not get eerror',
        })
        }

        return res.status(200).json({
            success:true,
            user,
            message:'User data fetched successfuly',
        })
    }
    catch(error) {
        console.log("Error", error);
        return res.status(500)
        .json({
            success:false,
            message:'Internal Server Error',
        })
    }
}
