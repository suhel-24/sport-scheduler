/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";

const DisplayGames = ({game, handleJoin}) => {
  const [gameData, setGame] = useState(game);
  const [teamSelection, setTeamSelection] = useState('');
  const handleTeamSelection = (value) => {
    setTeamSelection(value);
  };
  return (
    <>
      <div className="w-1/2 p-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold">Sport name: {gameData.sportName}</h2>
          <p className="text-gray-600 mt-2">
            <b>venue&emsp;&ensp;:&ensp;</b>
            {gameData.venue}
          </p>
          <div className="mt-4">
            <p>
              <span className="font-semibold">Date:</span> {gameData.date}
            </p>
            <p>
              <span className="font-semibold">Start time&ensp;:</span> {gameData.startTime}
            </p>
          </div>
          {!gameData.teamName ? ( 
            <>
              <div className="mt-4">
                <span className="font-semibold">Select Team:</span>
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input type="radio" name="teamSelection" value="team1" onChange={(e) => handleTeamSelection(e.target.value)} className="form-radio" />
                    <span className="ml-2">Team 1</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input type="radio" name="teamSelection" value="team2" onChange={(e) => handleTeamSelection(e.target.value)} className="form-radio" />
                    <span className="ml-2">Team 2</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-between items-center mt-6">
                <button onClick={() => handleJoin({...gameData, teamName: teamSelection})} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Join Game
                </button>
              </div>
            </>
          ):(
          <div>
            Team:{gameData.teamName}
          </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DisplayGames;
