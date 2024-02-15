
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import CreareSport from './pages/CreareSport';
import CreateGame from './pages/CreateGame';
import EditSport from './pages/EditSport';
import Navbar from './components/Navbar';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/createsport" element={<CreareSport />} />
        <Route path="/editSport" element={<EditSport />} />
        <Route path="/createGame" element={<CreateGame />} />
      </Routes>
    </Router>
  );
}

export default App;
