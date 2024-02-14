/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const SportCard = ({ sport, handleDelete }) => {
  const navigate = useNavigate();
  const handleEdit = (data) => {
    navigate("/editSport", { state: { ...data } });
  };
  return (
    <div className="w-1/2 p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold">Sport name: {sport.sname}</h2>
        <p className="text-gray-600 mt-2">
          <b>Description&emsp;&ensp;:&ensp;</b>
          {sport.sdesc}
        </p>
        <div className="mt-4">
          <p>
            <span className="font-semibold">Max Players:</span> {sport.maxplayers}
          </p>
          <p>
            <span className="font-semibold">Created By&ensp;:</span> {sport.created_by}
          </p>
        </div>
        <div className="flex justify-between items-center mt-6">
          <button onClick={() => handleDelete(sport.sportid)} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Delete Sport
          </button>
          <button onClick={() => handleEdit(sport)} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            edit Sport
          </button>
        </div>
      </div>
    </div>
  );
};

export default SportCard;
