/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const EditSport = () => {
  const location = useLocation();
  const data = location.state;
  console.log(data);
const [Sname, setSname] = useState(data.sname);
  const [Sdesc, setSdesc] = useState(data.sdesc);
  const [maxPlayers, setmaxplayers] = useState(data.maxplayers);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const maxPlayersInt = parseInt(maxPlayers, 10);
    const formData = { Sname, Sdesc, maxPlayers: maxPlayersInt };
    try {
      const response = await axios.post(`http://localhost:3000/admin/editSport?sportid=${data.sportid}`, formData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      alert("Successfully created!");
      navigate("/");
    } catch (error) {
      console.error("Login error", error.response);
      const message = error.response && error.response.data ? error.response.data.msg : 'An unknown error occurred';
      setErrorMessage(message);
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };
  return (
    <>
    <div className="relative">
    {errorMessage && (
        <div className="bg-red-500 text-white py-2 px-4 rounded absolute top-4 right-4">
          {errorMessage}
        </div>
      )}
    </div>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Sport Name:</label>
          <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text" name="email" value={Sname} onChange={(e) => setSname(e.target.value)} required />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Sport description:</label>
          <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text" name="password" value={Sdesc} onChange={(e) => setSdesc(e.target.value)} required />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Maximum players:</label>
          <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="number" name="maxPlayers" value={maxPlayers} onChange={(e) => setmaxplayers(e.target.value)} required />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border border-blue-700" type="submit">
          edit sport
        </button>
      </form>
    </>
  );
};

export default EditSport;
