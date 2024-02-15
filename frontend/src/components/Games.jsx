import { useEffect, useState } from "react";
import axios from "axios";
import Gamescard from "../cards/Gamescard";
import { Link } from "react-router-dom";


const Games = () => {
  const [gamesData, setGamesData] = useState([]);
  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      const userDataString = localStorage.getItem("userData");
      if (!userDataString) {
        console.error("No user data found in localStorage");
        return;
      }
      const localUserData = JSON.parse(userDataString);
      try {
        const response = await axios.get(`http://localhost:3000/user?userId=${localUserData.user_id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setGamesData(response.data);
      } catch (error) {
        console.error("Error fetching games data:", error);
      }
    };
    fetchDashboardData();
  }, []);

  const deleteGame = async (gameid) => {
    const token = localStorage.getItem("token");
   
    try {
      console.log(gameid);
      const response = await axios.post(`http://localhost:3000/user/deleteGame?gameId=${gameid}`,{}, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setGamesData((gamesData) => gamesData.filter((game) => game.gameId !== response.data.gameId));
    } catch (error) {
      console.error("Error deleting sport data:", error);
    }
  };

  return (
    <>
      <div className="border-gray-300 border-2">
        <div className="flex justify-between items-center p-4">
          <div className="text-xl text-black font-bold">Games</div>
          <Link to="/creategame" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create Game
          </Link>
        </div>
        <div className="flex flex-wrap">
          {gamesData.map((game) => (
            <Gamescard key={game.gameId} game={game} handleDelete={deleteGame}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default Games;
