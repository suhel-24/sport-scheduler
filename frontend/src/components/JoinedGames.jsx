/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import DisplayGames from "../cards/DisplayGames";

const JoinedGames = () => {
  const [allGames, setallGames] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    const fetchSports = async () => {
      const token = localStorage.getItem("token");
      const userDataString = localStorage.getItem("userData");
    const localUserData = JSON.parse(userDataString);
      try {
        const response = await axios.get(`http://localhost:3000/user/joinedGames?userId=${localUserData.user_id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setallGames(response.data);
      } catch (error) {
        console.error("Error fetching games", error);
        
      }
    };
    fetchSports();
  }, []);

  return (
    <>
      <div className="border-gray-300 border-2">
        <div className="flex justify-between items-center p-4">
          <div className="text-xl text-black font-bold">Joined Games</div>
        </div>
        <div className="flex flex-wrap">
          {allGames.map((game) => (
            <DisplayGames key={game.gameId} game={game}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default JoinedGames;
