const express = require("express");
const router = express.Router();
const {protect} = require('../middlewares/jwtAuth');
const { createGame ,deleteGame,getGames,getSports,editGame,joinGame,joinedGames,getAllGames} = require("../controller/userController");

// router.get("/",protect, )
router.post("/createGame",createGame )
router.post("/deleteGame",deleteGame )
router.post("/editGame",editGame )
router.get("/",getGames)
router.get("/getSports",getSports)
router.post("/joinGame",joinGame )
router.get("/joinedGames",joinedGames)
router.get("/getAllGames",getAllGames)

module.exports = router;