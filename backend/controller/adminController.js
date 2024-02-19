// Import PrismaClient instance
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createSport = async (req, res) => {
  try {
    const { Sname, Sdesc, maxPlayers, created_by } = req.body;
    if (!Sname || !Sdesc || !maxPlayers) {
      return res.status(400).send("Details are required");
    }
    // Use Prisma Client to insert a new record into the sports table
    const newSport = await prisma.sports.create({
      data: {
        sname: Sname,
        sdesc: Sdesc,
        maxplayers: maxPlayers,
        created_by, // Ensure this matches your Prisma schema field name for relations
      },
    });
    res.status(200).json(newSport);
  } catch (err) {
    console.error(err);
    res.status(500).json({message:'Error creating sport'});
  }
};

const getSport = async (req, res) => {
  const userId = req.query.userid;
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }
  try {
    const sports = await prisma.sports.findMany({
      where: {
        created_by: parseInt(userId),
      },
    });

    // Check if sports exist for the user
    if (sports.length > 0) {
      res.status(200).json(sports);
    } else {
      res.status(404).json({ message: 'No sports found for this user' });
    }
  } catch (error) {
    console.error('Error fetching sports:', error);
    res.status(500).json({ message: 'Error fetching sports' });
  }
};

const deleteSport=async(req,res)=>{
  const sportid=req.query.sportid;
  if(!sportid){
    return res.status(400).json({message:'Sport ID is required'});
  }
  try{
    const deletedSport=await prisma.sports.delete({
      where:{
        sportid:parseInt(sportid),
      }
    });
    res.status(200).json(deletedSport);
  }catch(error){
    console.error('Error deleting sport:',error);
    res.status(500).json({message:'Error deleting sport'});
  }
}

const editSport=async(req,res)=>{
  const sportid = req.query.sportid;
  const {Sname,Sdesc,maxPlayers}=req.body;
  if(!sportid || !Sname || !Sdesc || !maxPlayers){
    return res.status(400).json({message:'Sport ID, Name, Description, and Max Players are required'});
  }
  try{
    const updatedSport=await prisma.sports.update({
      where:{
        sportid:parseInt(sportid),
      },
      data:{
        sname:Sname,
        sdesc:Sdesc,
        maxplayers:maxPlayers,
      }
    });
    res.status(200).json(updatedSport);
  }catch(error){
    console.error('Error updating sport:',error);
    res.status(500).json({message:'Error updating sport'});
  }

}

const sportReport=async(req,res)=>{
  const sportid=req.query.sportid;
  if(!sportid){
    return res.status(400).json({message:'Sport ID is required'});
  }
  try{
    const sport=await prisma.sports.findMany({
      where:{
        sportid:parseInt(sportid),
      },
      include:{
        games:true,
      }
    });
    res.status(200).json(sport);
  }catch(error){
    console.error('Error fetching sport report:',error);
    res.status(500).json({message:'Error fetching sport report'});
  }
}
module.exports = { createSport, getSport,deleteSport,editSport,sportReport };
