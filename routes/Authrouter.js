const express = require("express");
const router = express.Router();
// const { createUser } = require("../controllers/createUser");
// const { getUser } = require("../controllers/getUser");
// router.post("/createUser", createUser);
// router.get("/getallUsers", getUser);

// const{signup,login}=require("../controllers/AuthControllers");
// const{signupValidation,loginValidation}=require ("../middlewares/AuthValidation")

// router.route('/login',loginValidation,login);
// router.route('/signup',signupValidation,signup);

// module.exports = router;

const { signup, login ,event } = require('../controllers/AuthControllers');
const { signupValidation, loginValidation ,eventValidation } = require('../middlewares/AuthValidation');
const{getdata, getAllRegisterUser}=require("../controllers/getdata")
const{deletevent}=require("../controllers/delete")
const{regformCreate}=require("../controllers/regform")
const e = require("cors");
const { auth } = require("../middlewares/auth");


router.post('/login', loginValidation, login);
router.post('/signup',signupValidation, signup);
router.post('/event',auth, event);
router.get("/eventdata",auth, getdata);
router.delete("/deletevent/:id",deletevent)
router.post("/regformCreate",regformCreate);
router.post("/getAllRegisterUser",auth , getAllRegisterUser);

module.exports = router;
