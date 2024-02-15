const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createGame = async (req, res) => {
    try {
        const { createdBy, sportId, date, startTime, venue ,maxGPlayers} = req.body;
        if (!createdBy || !sportId || !date || !startTime || !venue) {
        return res.status(400).send("All fields are required");
        }
        const newSession = await prisma.games.create({
        data: {
            createdBy,
            sportId,
            date,
            venue,
            maxGPlayers,
            startTime
        },
        });
        res.status(201).json(newSession);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}
const deleteGame = async (req, res) => {
    try {
        const  gameId  = req.query.gameId;
        if (!gameId) {
        return res.status(400).send("Game Id is required");
        }
        const deletedGame = await prisma.games.delete({
        where: {
            gameId:parseInt(gameId),
        },
        });
        res.status(201).json(deletedGame);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

const getGames = async (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
  }
  try {
      const games = await prisma.games.findMany({
        where: {
          createdBy: parseInt(userId),
        },
        include: {
          sport: true, // Include the related sport record
        },
      });

      // Check if games exist for the user
      if (games.length > 0) {
        // Customize the response to include sports name and other relevant details
        const customizedGames = games.map(game => ({
          gameId: game.gameId,
          sportName: game.sport.sname, // Accessing the sname from the included sport record
          date: game.date,
          startTime: game.startTime,
          venue: game.venue,
          maxGPlayers: game.maxGPlayers,
          isCompleted: game.isCompleted,
        }));
        res.status(200).json(customizedGames);
      } else {
        res.status(404).json({ message: 'No games found for this user' });
      }
    } catch (error) {
      console.error('Error fetching games:', error);
      res.status(500).json({ message: 'Error fetching games' });
    }
}

const getSports = async (req, res) => {
    try {
        const sports = await prisma.sports.findMany({
          select: {
            sportid: true,
            sname: true 
        }
      });
        res.status(200).json(sports);
      } catch (error) {
        console.error('Error fetching sports:', error);
        res.status(500).json({ message: 'Error fetching sports' });
      }
}

const editGame=async(req,res)=>{
  const gameId = req.query.gameId;
  const {date,startTime,venue,maxGPlayers,sportId}=req.body;
  if(!gameId || !date || !startTime || !venue || !maxGPlayers|| !sportId){
    return res.status(400).json({message:'Game ID, Date, Start Time, Venue, and Max Players are required'});
  }
  try{
    const updatedGame=await prisma.games.update({
      where:{
        gameId:parseInt(gameId),
      },
      data:{
        date,
        sportId,
        startTime,
        venue,
        maxGPlayers
      }
    });
    res.status(200).json(updatedGame);
  }catch(error){
    console.error('Error updating game:',error);
    res.status(500).json({message:'Error updating game'});
  }
}

module.exports = { createGame ,deleteGame ,getGames,getSports,editGame};