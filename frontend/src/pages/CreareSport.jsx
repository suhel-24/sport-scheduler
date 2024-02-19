import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreareSport = () => {
  const [Sname, setSname] = useState("");
  const [Sdesc, setSdesc] = useState("");
  const [maxPlayers, setmaxplayers] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const maxPlayersInt = parseInt(maxPlayers, 10);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const formData = { Sname, Sdesc, maxPlayers: maxPlayersInt, created_by: userData.user_id };
    try {
      const response = await axios.post("http://localhost:3000/admin/createSport", formData, {
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
          crearesport
        </button>
      </form>
    </>
  );
};

export default CreareSport;
