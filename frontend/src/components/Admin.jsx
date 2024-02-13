import { useEffect, useState } from "react";
import axios from "axios";
import SportCard from "../cards/Sportscard";
import { Link } from "react-router-dom";
const Sportscard = () => {
  const [userData, setUserData] = useState([]); 
  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      const userDataString = localStorage.getItem("userData");
      if (!userDataString) {
        console.error("No user data found in localStorage");
        return;
      }
      const localUserData = JSON.parse(userDataString);
      if (!localUserData || !localUserData.user_id) {
        console.error("No user ID found in parsed user data");
        return;
      }
      try {
        const response = await axios.get(`http://localhost:3000/admin?userid=${localUserData.user_id}`,{
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchDashboardData();
  }, []);
    const deleteSport=async(sportid)=>{
      try {
        const response = await axios.post(`http://localhost:3000/admin/deleteSport?sportid=${sportid}`);
        setUserData(userData => userData.filter(sport => sport.sportid !== response.data.sportid));
      } catch (error) {
        console.error("Error deleting sport data:", error);
      }
    }
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
          {userData.map((sport) => (
            <SportCard key={sport.sportid} sport={sport} deleteSport={deleteSport}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sportscard;
