import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Admin from "../components/Admin";
import User from "../components/User";
import JoinGame from "../components/JoinGame";
import JoinedGames from "../components/JoinedGames";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); // Initialize as null or {}

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Check if userData is truthy before attempting to access its properties
  return (
    <>
      <div className="text-xl">Welcome Mr.{userData ? userData.username : ""}</div>
      {userData && <>{userData.role === "admin" ? <Admin /> : <User />}</>}
      <JoinGame />
      <JoinedGames />
    </>
  );
};

export default Dashboard;
