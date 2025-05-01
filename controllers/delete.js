//import th model
const eventModel = require("../models/event");

//define route handler

exports.deletevent = async(req,res) => {
    try {
        const {id} = req.params;

        await eventModel.findByIdAndDelete(id);

        res.json({
            success:true,
            message:"event DELETE succesfully!",
        })
       
    }
    catch(err) {
        res.status(500)
        .json({
            success:false,
            message:'delete user',
        });
    }
}
