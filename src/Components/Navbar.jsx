// import { Link } from 'react-router-dom';
import React from 'react';
import { FaRegBell } from "react-icons/fa";  // icon of bell
import img from '../img/Avatar.png';
import 'bootstrap/dist/css/bootstrap.min.css';


function Navbar() {
  return (
    <section >
    
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom border-light border-5 ">
      <div className="container-md">
        <div className="navbar-brand fw-bold fs-2" style={{ color: '#6941C6' }}>
        PEOPLE.CO
        </div>
        <div className="d-flex flex-row align-items-center">
          <FaRegBell size={24} style={{ marginRight: '1rem' }} />
        
          <img src={img} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />   {/* Profile image */}
          <div className="pt-1 ms-2" style={{ fontWeight: '600' }}>
            Jane Doe
          </div>
        </div>
      </div>
    </nav>
    </section>
  );
}

export default Navbar;
