const mongoose = require ("mongoose");

require("dotenv").config();

const dbConnect = () =>{
    mongoose.connect(process.env.DATABASE_URL ,{
        // useNewUrlParser:true,
        // useUnifiedTopology:true,
    })
    .then(()=> console.log("dB CONNECTION SUCESFULL"))
    .catch((error)=>{
        console.log("issuse db connection")
        console.error(error.message);

        process.exit(1);
    })
}

module.exports = dbConnect;

//ae mongoose hai db se coonetionk ke liyen used krte hai