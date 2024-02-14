const express = require("express");
const router = express.Router();
const {protect} = require('../middlewares/jwtAuth')

// router.get("/",protect, )
router.post("/createGame",protect, )
module.exports = router;