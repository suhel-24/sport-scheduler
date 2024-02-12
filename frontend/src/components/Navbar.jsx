import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Navbar = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
      <nav className="flex justify-between bg-cyan-400">
        <div className="px-3 pt-3 text-xl"> <Link to="/">Dashboard</Link></div>
        <div>
          <ul className="flex justify-end space-x-8 px-24 py-3 text-xl">
            
            {userData ? (
              // If user is logged in, show email and username
              <>
                <li className="">{userData.username}</li>
                <li className="">{userData.email}</li>
                <li className="cursor-pointer" onClick={handleLogout}>logout</li>
              </>
            ) : (
              // If user is not logged in, show Login and Signup links
              <>
                <li className="cursor-pointer"><Link to="/login">Login</Link></li>
                <li className="cursor-pointer"><Link to="/signup">Signup</Link></li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
