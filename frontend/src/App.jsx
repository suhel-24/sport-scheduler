
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import CreareSport from './components/CreareSport';
import CreateGame from './components/CreateGame';
import EditSport from './components/EditSport';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/createsport" element={<CreareSport />} />
        <Route path="/creategame" element={<CreateGame />} />
        <Route path="/editSport" element={<EditSport />} />
      </Routes>
    </Router>
  );
}

export default App;
