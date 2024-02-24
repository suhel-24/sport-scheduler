/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import DisplayGames from "../cards/DisplayGames";

const JoinGame = () => {
  const [allGames, setallGames] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const fetchSports = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:3000/user/getAllGames", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setallGames(response.data);
      } catch (error) {
        console.error("Error fetching sports", error);
      }
    };
    fetchSports();
  }, []);
  const joinGame = async (game) => {
    console.log(game);
    const token = localStorage.getItem("token");
    const userDataString = localStorage.getItem("userData");
    const localUserData = JSON.parse(userDataString);
    const userId = localUserData.user_id;
    const { gameId, teamName } = game;
    const Data = { userId, gameId, teamName };
    console.log(game);
    try {
      const response = await axios.post(`http://localhost:3000/user/joinGame`, Data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      let message = "An unknown error occurred"; // Default message
      if (error.response && error.response.data) {
        message = error.response.data.message || message; // Use API response message if available
      }
      setErrorMessage(message);
      setTimeout(() => setErrorMessage(""), 3000); // Clear error message after 3 seconds
    }
  };

  return (
    <>
      <div className="relative">{errorMessage && <div className="bg-red-500 text-white py-2 px-4 rounded fixed top-4 right-4 z-50">{errorMessage}</div>}</div>
      <div className="border-gray-300 border-2">
        <div className="flex justify-between items-center p-4">
          <div className="text-xl text-black font-bold">Join Games</div>
        </div>
        <div className="flex flex-wrap">
          {allGames.map((game) => (
            <DisplayGames key={game.gameId} game={game} handleJoin={joinGame} />
          ))}
        </div>
      </div>
    </>
  );
};

export default JoinGame;
