const express = require("express");
const router = express.Router();
const {protect} = require('../middlewares/jwtAuth')
const {createSport, getSport,deleteSport,editSport,sportReport}=require('../controller/adminController')


// router.get("/",protect,)

router.post("/createSport",protect,createSport)
router.get("/",protect,getSport)
router.get("/sportReport",sportReport)
router.post("/deleteSport",protect,deleteSport)
router.post("/editSport",protect,editSport)
module.exports = router;