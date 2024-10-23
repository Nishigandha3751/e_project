import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Siderbar';
import Overview from './Components/Overview';
import PeopleDirectory from './Components/PeopleDirectory'; // Fix spelling

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="d-flex">
        <Sidebar /> {/* Render Sidebar here for persistent layout */}
        <div style={{ flex: 1 }}> {/* This will hold the main content */}
          <Routes>
            <Route path="/user" element={<Overview />} />
            <Route path="/user/students" element={<PeopleDirectory />} />
            <Route path="/" element={<Overview />} /> {/* Default route */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;






















