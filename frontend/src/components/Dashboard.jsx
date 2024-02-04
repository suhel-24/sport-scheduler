import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Admin from './Admin';
import User from './User';

const Dashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!username || !email) {
      navigate('/login');
    }
  }, [navigate, username, email]);
  const handleLogout = () => {
    // Clear all items from local storage
    localStorage.clear();

    // Redirect to the login page
    navigate('/login');
  };

  return (
    <>
      <div>Dashboard</div>
      {username && <p>Username: {username}</p>}
      {email && <p>Email: {email}</p>}
      <button onClick={handleLogout}>Logout</button>
      {role=="admin"?<Admin />:<User />}
    </>
  );
};

export default Dashboard;

