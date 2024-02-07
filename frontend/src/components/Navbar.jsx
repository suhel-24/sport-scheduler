import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between bg-cyan-400">
        <div className="px-3 pt-3 text-xl">LAGOIS</div>
        <div>
          <ul className="flex justify-end space-x-8 px-24 py-3 text-xl">
            <li className="cursor-pointer"><Link to="/">Dashboard</Link></li>
            <li className="cursor-pointer"><Link to="/login">Login</Link></li>
            <li className="cursor-pointer"><Link to="/signup">signup</Link></li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
