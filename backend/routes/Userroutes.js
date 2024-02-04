const express = require("express");
const router = express.Router();
const {protect} = require('../middlewares/jwtAuth')

// router.get("/",protect, )

module.exports = router;