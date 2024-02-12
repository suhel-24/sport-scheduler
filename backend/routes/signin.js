const express = require("express");
const router = express.Router();
const {getusersdata,addUser,checkuser} = require('../controller/signincontro')
const {protect} = require('../middlewares/jwtAuth')
router.get("/check",protect,getusersdata )
router.post('/signup',addUser)
router.post('/login',checkuser)
module.exports = router;