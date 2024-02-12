/* eslint-disable react/prop-types */

const SportCard = ({ sport, deleteSport }) => {
  return (
    <div className="w-1/2 p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold">{sport.sname}</h2>
        <p className="text-gray-600 mt-2">
          <b>Description</b>
          {sport.sdesc}
        </p>
        <div className="mt-4">
          <p>
            <span className="font-semibold">Max Players:</span> {sport.maxplayers}
          </p>
          <p>
            <span className="font-semibold">Created By:</span> {sport.created_by}
          </p>
        </div>
        <button onClick={() => deleteSport(sport.sportid)} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Delete Sport
        </button>
      </div>
    </div>
  );
};

export default SportCard;
