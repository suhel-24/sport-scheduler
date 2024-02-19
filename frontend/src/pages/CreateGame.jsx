/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate ,useLocation} from "react-router-dom";

const CreateGame = () => {
  const location = useLocation();
  const data = location.state 

  const [date, setDate] = useState(data?.date || "");
  const [startTime, setStartTime] = useState(data?.startTime || "");
  const [venue, setVenue] = useState(data?.venue || "");
  const [maxGPlayers, setMaxGPlayers] = useState(data?.maxGPlayers || "");
  const [sports, setSports] = useState(data?.sports || []);
  const [sportId, setSportId] = useState(data?.sportId || "");
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSports = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:3000/user/getSports", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setSports(response.data);
      } catch (error) {
        console.error("Error fetching sports", error);
      }
    };
    fetchSports();
  }, []); // Added empty dependency array to prevent effect from running more than once

  
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const maxPlayersInt = parseInt(maxGPlayers, 10);
    const sportIdInt = parseInt(sportId, 10);
    const combinedDateStartTime = new Date(`${date}T${startTime}:00Z`);
    const formattedDate = combinedDateStartTime.toISOString();
    const userData = JSON.parse(localStorage.getItem("userData"));
    const formData = { venue, startTime:formattedDate, date:formattedDate, sportId:sportIdInt, maxGPlayers: maxPlayersInt , createdBy: userData.user_id};
    try {
      if (data){
      const response = await axios.post(`http://localhost:3000/user/editGame?gameId=${data.gameId}`, formData, {
          headers: {
            'authorization': `Bearer ${token}`
          }
        });
      }
      else{
        const response = await axios.post("http://localhost:3000/user/createGame", formData, {
          headers: {
            'authorization': `Bearer ${token}`
          }
        });
      }

      +
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
      <div className="container mx-auto p-4">
        <h2 className="text-lg font-semibold mb-4">{data ? 'Edit Game' : 'Create Game'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="font-semibold">Select Sport:</label>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={sportId} onChange={(e) => setSportId(e.target.value)} required>
              <option value="">Select a sport</option>
              {sports.map((sport) => (
                <option key={sport.sportid} value={sport.sportid}>
                  {sport.sname}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="date" className="block">
              Date
            </label>
            <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 p-2 border rounded w-full" />
          </div>
          <div>
            <label htmlFor="startTime" className="block">
              Start Time
            </label>
            <input type="time" id="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="mt-1 p-2 border rounded w-full" />
          </div>
          <div>
            <label htmlFor="venue" className="block">
              Venue
            </label>
            <input type="text" id="venue" value={venue} onChange={(e) => setVenue(e.target.value)} className="mt-1 p-2 border rounded w-full" />
          </div>
          <div>
            <label htmlFor="maxGPlayers" className="block">
              Max Players
            </label>
            <input type="number" id="maxGPlayers" value={maxGPlayers} onChange={(e) => setMaxGPlayers(e.target.value)} className="mt-1 p-2 border rounded w-full" />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateGame;
