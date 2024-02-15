import { useEffect, useState } from "react";
import axios from "axios";
import SportCard from "../cards/Sportscard";
import { Link } from "react-router-dom";
import Games from "./Games";
const Sportscard = () => {
  const [sportData, setSportData] = useState([]);
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
        const response = await axios.get(`http://localhost:3000/admin?userid=${localUserData.user_id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setSportData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchDashboardData();
  }, []);
  const deleteSport = async (sportid) => {
    const token = localStorage.getItem("token");
   
    try {
      const response = await axios.post(`http://localhost:3000/admin/deleteSport?sportid=${sportid}`,{}, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setSportData((sportData) => sportData.filter((sport) => sport.sportid !== response.data.sportid));
    } catch (error) {
      console.error("Error deleting sport data:", error);
    }
  };
  return (
    <>
      <div className="border-gray-300 border-2">
        <div className="flex justify-between items-center p-4">
          <div className="text-xl text-black font-bold">Sports</div>
          {/* Correctly use Link component from react-router-dom styled as a button */}
          <Link to="/createsport" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create Sport
          </Link>
        </div>
        <div className="flex flex-wrap ">
          {sportData.map((sport) => (
            <SportCard key={sport.sportid} sport={sport} handleDelete={deleteSport} />
          ))}
        </div>
      </div>
      <Games />
    </>
  );
};

export default Sportscard;
