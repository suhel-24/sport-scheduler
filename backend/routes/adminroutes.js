const express = require("express");
const router = express.Router();
const {protect} = require('../middlewares/jwtAuth')
const {createSport, getSport,deleteSport}=require('../controller/adminController')


// router.get("/",protect,)

router.post("/createSport",protect,createSport)
router.get("/",getSport)
router.post("/deleteSport",deleteSport)
module.exports = router;