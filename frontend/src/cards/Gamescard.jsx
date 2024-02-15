/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const Gamescard = ({game,handleDelete}) => {
  const navigate = useNavigate();
  const handleEdit = (data) => {
    navigate("/creategame", { state: { ...data } });
  };
  return (
    <>
        <div className="w-1/2 p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold">Sport name: {game.sportName}</h2>
        <p className="text-gray-600 mt-2">
          <b>venue&emsp;&ensp;:&ensp;</b>
          {game.venue}
        </p>
        <div className="mt-4">
          <p>
            <span className="font-semibold">Date:</span> {game.date}
          </p>
          <p>
            <span className="font-semibold">Start time&ensp;:</span> {game.startTime}
          </p>
        </div>
        <div className="flex justify-between items-center mt-6">
          <button onClick={() => handleDelete(game.gameId)} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Delete Game
          </button>
          <button  onClick={() => handleEdit(game)} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            edit Game
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Gamescard